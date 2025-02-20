# urls_profile.py
from django.urls import path
from .views import userProfile, editProfile

urlpatterns = [
    path('profil/', userProfile, name='userProfile'),
    path('profil/edit/', editProfile, name='editProfile'),
]
