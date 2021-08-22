from rest_framework import serializers


class ProjectSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'

    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=255, required=True) 
