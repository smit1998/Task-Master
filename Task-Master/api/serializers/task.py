from rest_framework import serializers
from django.core.validators import MinValueValidator, MaxValueValidator
from api.models.task import Task


class TaskSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'

    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=100, required=True) 
    description = serializers.CharField(max_length=500, required=False, allow_blank=True) 
    story_points = serializers.IntegerField(required=True, validators=[MinValueValidator(1), MaxValueValidator(4)]) 
    priority = serializers.ChoiceField(choices=Task.PRIORITIES, required=False) 
    state = serializers.ChoiceField(choices=Task.STATES, required=False) 
    deadline = serializers.DateField(required=False, allow_null=True) 
    assigned_to = serializers.CharField(max_length=40, required=False, allow_blank=True, allow_null=True)
    project_id = serializers.IntegerField(required=True)

class NudgeTaskSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'

    id = serializers.IntegerField(required=True)
