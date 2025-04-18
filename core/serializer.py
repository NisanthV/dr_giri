from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import *


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

        return None

class OrganizationSerializer(ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'
        extra_kwargs = {
            "created_by":{
                "required":False
            }
        }

    def create(self, validated_data):

        validated_data['created_by'] = self.context['request'].user
        print(validated_data)
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

