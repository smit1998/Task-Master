from django.db.models import Q
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models.project import Project
from api.models.project_member import ProjectMember
from api.models.task import Task
from api.serializers.task import NudgeTaskSerializer, TaskSerializer
from api.views.connections import check_connection_bothways, list_connections

class TaskById(APIView):
    permission_classes = (IsAuthenticated,)
    # Get the specific info for a task from its ID
    def get(self, request, **kwargs):
        task = get_object_or_404(Task, pk=kwargs['task_id'])
        return Response({
            'id': task.id,
            'name': task.name,
            'description': task.description,
            'story_points': task.story_points,
            'priority': task.priority,
            'state': task.state,
            'deadline': task.deadline,
            'assigned_to': task.assigned_to,
            'project_id': task.project.id
        })

# Returns an arbitrary list of tasks in a structure as outlined below to minimise extra API calls
# Note - it does NOT mirror the Tasks model exactly
class UserAssignedTasks(APIView):
    permission_classes = (IsAuthenticated,)
    
    # Return all the tasks and their info for a specified username
    def get(self, request, **kwargs):
        tasks = get_list_or_404(Task, assigned_to=kwargs['username'])
        result = []
        for task in tasks:
            result.append({
                'id': task.id,
                'name': task.name,
                'description': task.description,
                'story_points': task.story_points,
                'priority': task.priority,
                'state': task.state,
                'deadline': task.deadline,
                'nudged': task.nudged,
                'assigned_to': task.assigned_to,
                'project_name': task.project.name,
                'project_id': task.project.id
            })
        return Response(result)


class ProjectTasks(APIView):
    permission_classes = (IsAuthenticated,)
    
    # Return all the tasks and their info for a specified project id
    def get(self, request, **kwargs):
        tasks = get_list_or_404(Task, project_id=kwargs['project_id'])
        result = []
        for task in tasks:
            result.append({
                'id': task.id,
                'name': task.name,
                'description': task.description,
                'story_points': task.story_points,
                'priority': task.priority,
                'state': task.state,
                'deadline': task.deadline,
                'nudged': task.nudged,
                'assigned_to': task.assigned_to,
                'project_id': task.project.id
            })
        return Response(result)


class CreateTask(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            data = request.data
            user = request.user

            try:
                project = Project.objects.get(pk=data.get('project_id'))
            except:
                return Response({ "error": "Project does not exist" }, status=status.HTTP_400_BAD_REQUEST)

            if not self.user_has_permission(user.id, data.get('project_id')):
                return Response({ "error": "User not in the project" }, status=status.HTTP_401_UNAUTHORIZED)

            try:
                assigned_user = user
                if data.get('assigned_to'):
                    assigned_user = User.objects.get(username=data.get('assigned_to'))

                    if not self.user_has_permission(assigned_user.id, data.get('project_id')):
                        return Response({ "error": "Assigned user not in the project" }, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({ "error": "Assigned user does not exist" }, status=status.HTTP_400_BAD_REQUEST)

            self.create_task(data, assigned_user, user, project)
            return Response({ "message": "Task created" }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def user_has_permission(self, user_id, project_id):
        try:
            ProjectMember.objects.get(user_id=user_id, project=project_id)
            return True
        except:
            return False


    def create_task(self, data, assigned_user, creator_user, project):
        new_task = Task(
            name=data.get('name'),
            description=data.get('description'),
            story_points=data.get('story_points'),
            assigned_to=assigned_user,
            created_by=creator_user,
            project=project,
        )

        if data.get('priority'):
            new_task.priority = data.get('priority')
        if data.get('state'):
            new_task.state = data.get('state')
        if data.get('deadline'):
            new_task.deadline = data.get('deadline')

        new_task.save()

class UpdateTask(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            data = request.data
            user = request.user
            task_id = data.get('task_id')
            task = Task.objects.get(id=task_id)

            if user_has_permission_to_update(user, task):
                self.update_task(task, request.data)
                return Response(serializer.data)
            else:
                return Response("You do not have permission to update this task", status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update_task(self, task, data):
        if data.get('state'):
            task.state = data.get('state')
        if data.get('description') or data.get('description') == '':
            task.description = data.get('description')
        if data.get('name'):
            task.name = data.get('name')
        if data.get('story_points'):
            task.story_points = data.get('story_points') 
        if data.get('priority'):
            task.priority = data.get('priority')
        task.assigned_to = data.get('assigned_to')
        task.deadline = data.get('deadline')
        task.save()

class SearchProjectTasks(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        query = Q(project_id=kwargs['project_id']) & (
                    Q(id__contains=kwargs['query']) | \
                    Q(name__contains=kwargs['query']) | \
                    Q(description__contains=kwargs['query'])
                )
        tasks = Task.objects.filter(query)
        result = []
        for task in tasks:
            result.append({
                'id': task.id,
                'name': task.name,
                'description': task.description,
                'story_points': task.story_points,
                'priority': task.priority,
                'state': task.state,
                'deadline': task.deadline,
                'assigned_to': task.assigned_to,
                'project_id': task.project.id
            })
        return Response(result)

class SearchAssignedTasks(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        query = Q(assigned_to=request.user.username) & (
                    Q(id__contains=kwargs['query']) | \
                    Q(name__contains=kwargs['query']) | \
                    Q(description__contains=kwargs['query'])
                )
        tasks = Task.objects.filter(query)
        result = []
        for task in tasks:
            result.append({
                'id': task.id,
                'name': task.name,
                'description': task.description,
                'story_points': task.story_points,
                'priority': task.priority,
                'state': task.state,
                'deadline': task.deadline,
                'assigned_to': task.assigned_to,
                'project_name': task.project.name,
                'project_id': task.project.id
            })
        return Response(result)

class SearchConnectedTasks(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        connections = list_connections(request.user)
        connections.append(request.user.username)
        result = []
        for conn in connections:
            query = Q(assigned_to=conn) & (
                        Q(id__contains=kwargs['query']) | \
                        Q(name__contains=kwargs['query']) | \
                        Q(description__contains=kwargs['query']) | \
                        Q(assigned_to__startswith=kwargs['query'])
                    )
            tasks = Task.objects.filter(query)
            for task in tasks:
                result.append({
                    'id': task.id,
                    'name': task.name,
                    'description': task.description,
                    'story_points': task.story_points,
                    'priority': task.priority,
                    'state': task.state,
                    'deadline': task.deadline,
                    'assigned_to': task.assigned_to,
                    'project_name': task.project.name,
                    'project_id': task.project.id
                })
        return Response(result)

class GetConnectedTasks(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        connections = list_connections(request.user)
        connections.append(request.user.username)
        result = []
        for conn in connections:
            query = Q(assigned_to=conn)
            tasks = Task.objects.filter(query)
            for task in tasks:
                result.append({
                    'id': task.id,
                    'name': task.name,
                    'description': task.description,
                    'story_points': task.story_points,
                    'priority': task.priority,
                    'state': task.state,
                    'deadline': task.deadline,
                    'assigned_to': task.assigned_to,
                    'project_name': task.project.name,
                    'project_id': task.project.id
                })
        return Response(result)

class ToggleNudgeTask(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = NudgeTaskSerializer(data=request.data)
        if serializer.is_valid():
            task_id = request.data.get('id')

            try:
                task = Task.objects.get(id=task_id)
            except:
                return Response({ "error": "A task with that ID does not exist" }, status=status.HTTP_400_BAD_REQUEST)
            
            task.nudged = not task.nudged
            task.save()
            message = f'Nudged task successfully!' if task.nudged else f'Unnudged task successfully!'

            return Response({ 'message': message }, status=status.HTTP_200_OK)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserTasksByUsernameConnected(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, **kwargs):
        data = request.data
        user = request.user
        connection = check_connection_bothways(user, data)
        if connection:
            tasks = get_list_or_404(Task, assigned_to=kwargs['username'])
            result = []
            for task in tasks:
                result.append({
                    'id': task.id,
                    'name': task.name,
                    'story_points': task.story_points,
                    'priority': task.priority,
                    'state': task.state,
                    'deadline': task.deadline,
                    'project_name': task.project.name,
                })
            return Response(result)
        return Response("not connected both ways", status=status.HTTP_404_NOT_FOUND)

def user_has_permission_to_update(user, task):
    # check if user is in the list of project_id in project_member table

    # Query Task table and obtain project_id field
    # Obtain list of users related to project id in ProjectMember table
    project_member_list = ProjectMember.objects.filter(project_id=task.project_id)

    # Check user is part of project
    if project_member_list.filter(user=user.id) and \
        (task.created_by.username == user.username or task.assigned_to == user.username):
        return True
    return False
