from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from django.contrib.auth import authenticate
import jwt, datetime


class RegistrationView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        if authenticate(request, email=email, password=password):

            user_data = User.objects.get(email=email)

            payload = {
                'id': user_data.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            }
            token = jwt.encode(payload, "secure", algorithm='HS256')
            response = Response()
            response.set_cookie("jwt", token, httponly=True)
            return response
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class UserView(APIView):

    def get(self,request):

        token = request.COOKIES.get("jwt")

        if not token:
            raise AuthenticationFailed("UNAUTHORIZED")

        try:
            payload = jwt.decode(token, "secure", algorithms=['HS256'])
        except jwt.PyJWTError as e:
            raise AuthenticationFailed(f"UNAUTHORIZED {e}")

        user = User.objects.get(id=payload.get('id'))
        serializer = UserSerializer(user)

        return Response(serializer.data)

class LogOutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data={"message": "success"}
        return response