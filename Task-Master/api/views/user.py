from django.db.models import Q
from django.shortcuts import get_list_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.serializers.user import UserSerializer, UserUpdateSerializer


class Users(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UserMyself(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'id': user.id,
        })


# Returns a list of users which match the search term in a specific format that will make
# the frontend require less calls to display the results
# Pass in a 'search_term' string
class SearchUsers(APIView):
    permission_classes = (IsAuthenticated,)
    # Get the specific info for a task from its ID
    def get(self, request, **kwargs):
        # Interesting syntax that is essentially SQL queries
        # https://docs.djangoproject.com/en/3.2/topics/db/queries/#complex-lookups-with-q
        query = (Q(username__startswith=kwargs['search_term']) | \
                Q(email__startswith=kwargs['search_term']) | \
                Q(first_name__startswith=kwargs['search_term']) | \
                Q(last_name__startswith=kwargs['search_term'])) & \
                ~Q(id__iexact=request.user.id)
        potentialUsers = User.objects.filter(query)
        result = []
        for user in potentialUsers:
            result.append({
                'user_id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
            })

        if not result:
            result.append({
                'error': "No users found"
            })

        return Response(result)

class UpdateUser(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = UserUpdateSerializer(data=request.data)

        if serializer.is_valid():
            self.update_details(request.user, request.data)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_details(self, user, data):
        modified = False

        if data.get('first_name'):
            user.first_name = data.get('first_name')
            modified = True
        if data.get('last_name'):
            user.last_name = data.get('last_name')
            modified = True
        if data.get('email'):
            user.email = data.get('email')
            modified = True

        if modified:
            user.save()
