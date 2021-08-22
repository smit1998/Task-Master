from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from api.models.project import Project

class Task(models.Model):
    class Meta:
        db_table = "task"

    PRIORITIES = (
        ('L', 'Low'),
        ('M', 'Medium'),
        ('H', 'High'),
        ('N', 'Need Triage'),
    )

    STATES = (
        ('N', 'Not Started'),
        ('I', 'In Progress'),
        ('B', 'Blocked'),
        ('D', 'Done'),
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500, default=None, blank=True, null=True)
    story_points = models.IntegerField(null=True, validators=[MinValueValidator(1), MaxValueValidator(4)])
    priority = models.CharField(max_length=1, choices=PRIORITIES, default=PRIORITIES[3][0])
    state = models.CharField(max_length=1, choices=STATES, default=STATES[0][0])
    deadline = models.DateField(default=None, blank=True, null=True)
    nudged = models.BooleanField(default=False)
    assigned_to = models.CharField(max_length=40, null=True)
    project = models.ForeignKey(Project, related_name='task_project_id', on_delete=models.CASCADE)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='created_by', on_delete=models.CASCADE)