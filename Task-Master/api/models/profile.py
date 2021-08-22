from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

class Profile(models.Model):
    class Meta:
        db_table = "profile"

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @receiver(post_save, sender=User)
    def save_profile(sender, instance, created, **kwargs):
        if created:
            profile = Profile(user=instance)
            profile.save()
