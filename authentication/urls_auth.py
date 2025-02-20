# urls_auth.py
from django.urls import path
from .views import connexion, inscription, logout_view, user_dashboard

urlpatterns = [
    path('login', connexion, name='connexion'),
    path('register', inscription, name='inscription'),
    path('logout', logout_view, name='logout'),
    path('index', user_dashboard, name='userHome'),
]
