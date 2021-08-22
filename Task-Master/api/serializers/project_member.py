from rest_framework import serializers


class AddProjectMembersSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'

    user_id = serializers.IntegerField() 
