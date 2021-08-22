from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models.connections import Connections
from rest_framework import status
from api.models.open_to_work import OpenToWork
from api.serializers.open_to_work import DeclareIsOpenToWorkSerializer

class CreateIsOpenToWork(APIView):

    def post(self, request):
        serializer = DeclareIsOpenToWorkSerializer(data=request.data)

        if serializer.is_valid():
            # provide user in data
            data = request.data
            user = User.objects.get(username=data.get('user'))

            try:
                if check_if_declared(user):
                    return Response({"error": "user already has a switch declared"}, status=status.HTTP_400_BAD_REQUEST)
                
                self.create_open_to_work(user)
                return Response({"message": "Open to work switch created successfully!"}, status=status.HTTP_201_CREATED)
            
            except:     
                return Response({ "error": "No user with this username exists"}, status=status.HTTP_400_BAD_REQUEST)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_open_to_work(self, user):
        new_user_declaration = OpenToWork(
            user = user,
            is_open_to_work = False
        )
        new_user_declaration.save()
    
class ToggleOpenToWork(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = DeclareIsOpenToWorkSerializer(data=request.data)

        if serializer.is_valid():
            # provide user in data
            data = request.data
            user = request.user
            try:
                update_open_to_work = OpenToWork.objects.get(user=user)
                update_open_to_work.is_open_to_work = not (update_open_to_work.is_open_to_work)
                update_open_to_work.save()

                return Response({"message": "Switch action reversed successfully"}, status=status.HTTP_201_CREATED)
            except:
                return Response({"error": "Switch action can not be reversed"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetOpenToWorkState(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        user = User.objects.get(username=kwargs['username'])
        try:
            if not check_if_declared(user):
                return Response({"error": "user does not have a switch yet"}, status=status.HTTP_400_BAD_REQUEST)
            
            currentState = OpenToWork.objects.get(user=user)
            return Response({"is_open_to_work": currentState.is_open_to_work})
        except:
            return Response({ "error": "No user with this username exists"}, status=status.HTTP_400_BAD_REQUEST)


def check_if_declared(user):
    openToWorkExists = OpenToWork.objects.filter(user=user).exists()
    if openToWorkExists:
        return True
    return False
