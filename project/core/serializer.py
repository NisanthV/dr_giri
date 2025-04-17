from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)

        if password:
            instance.set_password(password)
            instance.save()
            return instance
