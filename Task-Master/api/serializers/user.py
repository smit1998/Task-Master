from django.contrib.auth.models import User
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
   username = serializers.CharField(max_length=40, required=True) 
   password = serializers.CharField(max_length=50, required=True)
   email = serializers.EmailField(allow_blank=False, required=True)
   first_name = serializers.CharField(max_length=50, allow_blank=False, required=True, allow_null=False)
   last_name = serializers.CharField(max_length=50, allow_blank=False, required=True, allow_null=False)
   
   class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']

class UserRegistrationSerializer(BaseUserRegistrationSerializer):
   username = serializers.CharField(max_length=40, required=True) 
   password = serializers.CharField(max_length=50, required=True)
   email = serializers.EmailField(allow_blank=False, required=True)
   first_name = serializers.CharField(max_length=50, allow_blank=False, required=True, allow_null=False)
   last_name = serializers.CharField(max_length=50, allow_blank=False, required=True, allow_null=False)

   class Meta(BaseUserRegistrationSerializer.Meta):
        fields = ('email', 'first_name', 'last_name', 'username', 'password')

   def validate_email(self, value):
      try:
         User.objects.get(email=value)
         raise serializers.ValidationError('A user with this email has already been registered')
      except User.DoesNotExist:
         return value

   def validate_username(self, value):
      try:
         User.objects.get(username=value)
         raise serializers.ValidationError('A user with this username has already been registered')
      except User.DoesNotExist:
         return value

class UserUpdateSerializer(serializers.Serializer):
   first_name = serializers.CharField(max_length=50, required=False)
   last_name = serializers.CharField(max_length=50, required=False)
   email = serializers.EmailField(allow_blank=False, required=True)

   class Meta:
      fields = ('first_name', 'last_name', 'email')
