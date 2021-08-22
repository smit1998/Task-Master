from django.db import models

class Project(models.Model):
    class Meta:
        db_table = "project"

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
