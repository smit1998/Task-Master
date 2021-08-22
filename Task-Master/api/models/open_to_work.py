from django.db import models
from django.conf import settings
from api.models.profile import Profile

class OpenToWork(models.Model):
    class Meta:
        db_table = "open_to_work"

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_open_to_work = models.BooleanField(default=False)