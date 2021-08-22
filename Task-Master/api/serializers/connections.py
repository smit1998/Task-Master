from rest_framework import serializers

class CreateConnectionSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'

    id = serializers.ReadOnlyField()
    connected_user_name = serializers.CharField(max_length=40, required=True)