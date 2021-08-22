from django.db import models
from django.conf import settings
from api.models.project import Project

# project members table
class ProjectMember(models.Model):
    class Meta:
        db_table = "project_member"

    id = models.AutoField(primary_key=True)
    is_owner = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_id', on_delete=models.CASCADE)
    project = models.ForeignKey(Project, related_name='member_project_id', on_delete=models.CASCADE)
