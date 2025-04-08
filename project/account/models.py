from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = None
    name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=68,null=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

