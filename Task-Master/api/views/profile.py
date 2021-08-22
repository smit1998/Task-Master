import json, math

from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from api.models.task import Task
from api.serializers.profile import ProfileSerializer

from datetime import datetime, timedelta
from pytz import timezone

class Profile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs['username'])
        profile_serializer = ProfileSerializer(user.profile)
        render = JSONRenderer().render(profile_serializer.data)
        data = json.loads(render)
        busyness = busynessCalculation(user)
        return Response({
            'username': data['username'],
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'email': data['email'],
            'busyness': busyness
            })

def busynessCalculation(user):
    # pass in user object
    try:
        tasks = Task.objects.filter(assigned_to=user.username)
    except:
        return 'Free'
    today = datetime.today().astimezone(timezone("Australia/Sydney")).date()
    end_date = today + timedelta(days=7)

    total_hours = 0
    for task in tasks:
        # skip task if done
        if (task.state == 'D' or task.state == 'B'):
            continue

        if (task.deadline != None and task.deadline >= today and task.deadline <= end_date):
            # story points
            task_hours = 1
            if (task.story_points!= None):
                task_hours *= math.pow(2.6, task.story_points - 1)

            if (task.priority == 'M'):
                task_hours *= 1.5
            elif (task.priority == 'H'):
                task_hours *= 2

            total_hours += task_hours

    if (total_hours > 40):
        return "100%+ overloaded"
    return str(int(total_hours*100/40)) + "% busy"
    
