from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = None
    name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=108,null=False)
    organization = models.ForeignKey('Organization',on_delete=models.CASCADE,null=True)
    role = models.ForeignKey('Role',on_delete=models.CASCADE,null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name

class Organization(models.Model):

    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)
    created_by = models.ForeignKey('User',on_delete=models.CASCADE,related_name='organization_creater')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Role(models.Model):

    name = models.CharField(max_length=20)
    description = models.CharField(max_length=25)
    organization = models.ForeignKey('Organization',on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class News(models.Model):

    content = models.JSONField()
    organization = models.ForeignKey('Organization',on_delete=models.CASCADE)
    created_by = models.ForeignKey('User',on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content.get('title','No title')
