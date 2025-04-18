from django.contrib.auth.models import AnonymousUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
import jwt, datetime
from .serializer import *

@ensure_csrf_cookie
def get_csrf_token(reqest):
    return JsonResponse({"data":"token set"})

class RegistrationView(APIView):

    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')
        user_data = authenticate(request, email=email, password=password)
        if not user_data:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        payload = {
            'id': user_data.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        }
        token = jwt.encode(payload, "secure", algorithm='HS256')
        response = Response()
        response.set_cookie("jwt", token, httponly=True)
        return response



class UserView(APIView):

    def get(self, request):

        if isinstance(request.user, AnonymousUser):
            return Response("Login required", status=status.HTTP_403_FORBIDDEN)

        serializer = UserSerializer(instance=request.user)
        return Response(serializer.data)


class LogOutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"message": "success"}
        return response

class OraganizationView(APIView):

    def post(self,reqest):

        if isinstance(reqest.user,AnonymousUser):
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = OrganizationSerializer(data=reqest.data,context={'request':reqest})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self,request,name=None):

        if isinstance(request.user,AnonymousUser):
            return Response("Login required",status=status.HTTP_403_FORBIDDEN)

        if not name:
            instance = Organization.objects.filter(created_by = request.user.id)

            if not instance:
                return Response("User not own any organization",status=status.HTTP_404_NOT_FOUND)

            serialized = OrganizationSerializer(instance=instance,many=True)

            return Response(serialized.data,status=status.HTTP_200_OK)

        instance = Organization.objects.filter(name__istartswith=name)

        if not instance:
            return Response("No Organization in our database",status=status.HTTP_404_NOT_FOUND)

        serialized = OrganizationSerializer(instance=instance,many=True)
        return Response(serialized.data,status=status.HTTP_200_OK)

    def put(self,request,id):

        if isinstance(request.user,AnonymousUser):
            return Response("Login required",status=status.HTTP_403_FORBIDDEN)

        if not id:
            return Response("Organization must be specified",status=status.HTTP_403_FORBIDDEN)

        instance = Organization.objects.filter(id=id).first()

        if not instance:
            return Response("requested organization not found",status=status.HTTP_404_NOT_FOUND)

        if instance.created_by_id == request.user.id:

            serialized = OrganizationSerializer(instance=instance,data=request.data,partial=True)

            if serialized.is_valid(raise_exception=True):
                serialized.save()
                return Response(serialized.data,status=status.HTTP_200_OK)

        return Response("UNAUTHORIZED",status=status.HTTP_401_UNAUTHORIZED)

    def delete(self,request,id):

        if isinstance(request.user,AnonymousUser):
            return Response("Login required",status=status.HTTP_403_FORBIDDEN)

        if not id:
            return Response("Organization must be specified", status=status.HTTP_403_FORBIDDEN)

        instance = Organization.objects.filter(id=id).first()

        if not instance:
            return Response("requested organization not found", status=status.HTTP_404_NOT_FOUND)

        if instance.created_by_id == request.user.id:

            instance.delete()
            return Response(status=status.HTTP_200_OK)

        return Response("UNAUTHORIZED",status=status.HTTP_401_UNAUTHORIZED)