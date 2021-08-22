from django.db.models import Q
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models.connections import Connections
from api.models.project import Project
from api.models.project_member import ProjectMember
from api.serializers.project import ProjectSerializer
from api.serializers.project_member import AddProjectMembersSerializer
from api.views.profile import busynessCalculation


class UserProjects(APIView):
    permission_classes = (IsAuthenticated,)

    # Return all the projects for a logged in user
    def get(self, request):
        user = request.user
        project_members = ProjectMember.objects.filter(user_id=user.id)
        project_ids = [pm.project for pm in project_members]
        serializer = ProjectSerializer(project_ids, many=True)
        return Response(serializer.data)

class UserProjectsByUsername(APIView):
    permission_classes = (IsAuthenticated,)

    # Return the list of projects for a user by username
    def get(self, request, *args, **kwargs):
        user_id = User.objects.get(username=kwargs['username']).id
        project_members = ProjectMember.objects.filter(user_id=user_id)
        project_ids = [pm.project for pm in project_members]
        serializer = ProjectSerializer(project_ids, many=True)
        return Response(serializer.data)


class CreateProject(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user
            new_project = Project(name=request.data.get('name'))
            new_project.save()
            new_project_member = ProjectMember(user=user, is_owner=True, project=new_project)
            new_project_member.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetProjectMembers(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        project_members = get_list_or_404(ProjectMember, project=kwargs['project_id'])
        result = []
        user = request.user

        if not user_in_project(user.id, kwargs['project_id']):
            return Response({ 'error': 'User not in the project' }, status=status.HTTP_401_UNAUTHORIZED)

        for member in project_members:
            project_member = User.objects.get(pk=member.user_id)
            busyness = busynessCalculation(project_member)
            result.append({'id': project_member.id, 'username': project_member.username, 'busyness': busyness})

        return Response({'members': result, 'is_owner': is_user_owner(user, kwargs['project_id'])})


class AddProjectMembers(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, **kwargs):
        serializer = AddProjectMembersSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        user = request.user

        try:
            project = Project.objects.get(pk=kwargs['project_id'])
        except:
            return Response({ 'error': 'Project does not exist' }, status=status.HTTP_400_BAD_REQUEST)

        if not user_in_project(user.id, kwargs['project_id']):
            return Response({ 'error': 'User not in the project' }, status=status.HTTP_401_UNAUTHORIZED)
        elif not is_user_owner(user.id, kwargs['project_id']):
            return Response({ 'error': 'Only the project owner can add project members' }, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user_to_add = User.objects.get(pk=data.get('user_id'))
        except:
            return Response({ 'error': 'User does not exist' }, status=status.HTTP_400_BAD_REQUEST)

        if user_in_project(user_to_add.id, kwargs['project_id']):
            return Response({ 'error': 'User being added is already in the project' }, status=status.HTTP_403_FORBIDDEN)

        new_project_member = ProjectMember(user=user_to_add, project=project)
        new_project_member.save()
        return Response({ 'message': 'User has been added to the project' })


class GetEligibleProjectMembers(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        user = request.user
        result = []
        following_users = get_list_or_404(Connections, user_id=user)

        for follow_user in following_users:
            try:
                user_obj = User.objects.get(username=follow_user.connected_user_name)
                query = Q(user__exact=user_obj) & Q(connected_user_name=user.username)
                Connections.objects.get(query)
                if not user_in_project(user_obj.id, kwargs['project_id']):
                    result.append({'username': follow_user.connected_user_name, 'id': user_obj.id})
            except:
                pass

        return Response(result)


def user_in_project(user_id, project_id):
    try:
        ProjectMember.objects.get(user_id=user_id, project=project_id)
        return True
    except:
        return False


def is_user_owner(user_id, project_id):
    try:
        ProjectMember.objects.get(user_id=user_id, project=project_id, is_owner=True)
        return True
    except:
        return False
