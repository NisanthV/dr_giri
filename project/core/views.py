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

        user_data = User.objects.get(email=email)

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
        print(request.user)
        if not isinstance(request.user, AnonymousUser):
            serializer = UserSerializer(instance=request.user)
            return Response(serializer.data)
        return Response("invalid token")


class LogOutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"message": "success"}
        return response
