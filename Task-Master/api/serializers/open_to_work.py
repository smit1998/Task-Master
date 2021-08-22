from rest_framework import serializers
from api.models.open_to_work import OpenToWork

class DeclareIsOpenToWorkSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'

    id = serializers.ReadOnlyField()
    user = serializers.CharField(max_length=40, required=True)