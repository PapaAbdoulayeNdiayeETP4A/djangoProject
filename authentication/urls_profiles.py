# urls_profile.py
from django.urls import path
from .views import userProfile, editProfile, UserListCreateView, UserUpdateDestroyView

urlpatterns = [
    path('profil/', userProfile, name='userProfile'),
    path('profil/edit/', editProfile, name='editProfile'),
    path('api/user/', UserListCreateView.as_view(), name='userCreateList_api'),
    path('api/user/<int:pk>', UserUpdateDestroyView.as_view(), name='userUpdateDestroy_api')
]
