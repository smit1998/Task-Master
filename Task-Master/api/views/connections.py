from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models.connections import Connections
from api.serializers.connections import CreateConnectionSerializer
from rest_framework import status
from django.contrib.auth.models import User

class CreateConnection(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = CreateConnectionSerializer(data=request.data)

        if serializer.is_valid():
            data = request.data
            user = request.user
            
            if check_connection(user, data):
                return Response({"message": "User already connected"}, status=status.HTTP_201_CREATED)
            
            self.create_connection(user, data)
            return Response({"message": "User connected successfully"}, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_connection(self, user, data):
        if not Connections.objects.filter(connected_user_name=data['connected_user_name'], user=user).exists():
            new_connection = Connections(
                connected_user_name=data.get('connected_user_name'),
                user=user
            )
            new_connection.save()

class IsFollowing(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = CreateConnectionSerializer(data=request.data)

        if serializer.is_valid():
            data = request.data
            user = request.user

            if check_connection(user, data):
                return Response({ "message": "User is following"}, status=status.HTTP_201_CREATED)
            
            return Response({ "message": "User is not following"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteConnection(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = CreateConnectionSerializer(data=request.data)

        if serializer.is_valid():
            data = request.data
            user = request.user

            try:
                if not check_connection(user, data):
                    return Response({"message": "User not connected"}, status=status.HTTP_201_CREATED)
                
                self.unFollow(user, data)
                return Response({"message": "User unfollowed successfully"}, status=status.HTTP_201_CREATED)
            except:
                return Response({ "error": "Fatal error"}, status=status.HTTP_400_BAD_REQUEST)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def unFollow(self, user, data):
        Connections.objects.get(connected_user_name=data.get('connected_user_name'), user=user).delete()

class ListFollowers(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        try:
            connected_users = get_list_or_404(Connections, connected_user_name=kwargs['username'])

            followers = []
            for i in connected_users:
                followers.append({
                    'follower': i.user.username
                })

            return Response(followers)
        except: 
            return Response({ "error": "No user with this username exists"}, status=status.HTTP_400_BAD_REQUEST)
        
class ListFollowing(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        try:
            user = get_object_or_404(User, username=kwargs['username'])
            following = get_list_or_404(Connections, user_id=user)
            follow = []
            for i in following:
                follow.append({
                    'follow': i.connected_user_name
                })
            return Response(follow)
        except:
            return Response({ "error": "User is not following any other user"}, status=status.HTTP_400_BAD_REQUEST)

class ListConnections(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        try:
            connections = list_connections(request.user)
            return Response(connections)
        except:
            return Response({ "error": "User is not following any other user"}, status=status.HTTP_400_BAD_REQUEST)

def check_connection(user, data):
    user_connection = Connections.objects.filter(connected_user_name=data.get('connected_user_name'), user=user).exists()
    if user_connection:
        return True
    return False

def check_connection_bothways(user, data):
    user_connection_1 = check_connection(user, data)
    user_2 = User.objects.get(username=data['connected_user_name'])
    user_connection_2 = False
    if user_2:
        user_connection_2 = Connections.objects.filter(connected_user_name=user.username, user=user_2).exists()

    if user_connection_1 and user_connection_2:
        return True
    return False

def list_connections(user):
    list_connections = []
    user_following = Connections.objects.filter(user_id=user)
    for connection in user_following:
        conn_username = connection.connected_user_name
        if check_connection_bothways(user, {"connected_user_name": conn_username}):
            list_connections.append(conn_username)
    return list_connections
