from django.db import models
from django.conf import settings
from api.models.profile import Profile

class Connections(models.Model):
    class Meta:
        db_table = "connections"

    id = models.AutoField(primary_key=True)
    connected_user_name = models.CharField(max_length=40)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='requestingUser_id', on_delete=models.CASCADE)