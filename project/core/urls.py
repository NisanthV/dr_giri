from django.urls import path
from .views import *

urlpatterns = [
    path('csrf-token/',get_csrf_token,name='csrf_token'),
    path('register/',RegistrationView.as_view(),name="register"),
    path('login/',LoginView.as_view(),name="login"),
    path('user/',UserView.as_view(),name="user"),
    path('logout/',LogOutView.as_view(),name="logout"),
    path('organization/',OraganizationView.as_view(),name="organization"),
    path('organization/<int:id>/',OraganizationView.as_view(),name="organization"),
    path('organization/<str:name>/',OraganizationView.as_view(),name="organization"),
]