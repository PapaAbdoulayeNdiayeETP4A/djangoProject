"""
URL configuration for gtaches project.

The `urlpatterns` list routes URLs to students_views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function students_views
    1. Add an import:  from my_app import students_views
    2. Add a URL to urlpatterns:  path('', students_views.home, name='home')
Class-based students_views
    1. Add an import:  from other_app.students_views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from authentication.views import connexion, inscription, logout_view, userProfile, editProfile, user_dashboard
from gtachesapp.views import createProject, addTask, editProject, deleteProject, showProject, showTask

urlpatterns = [
    path('auth/login', connexion, name='connexion'),
    path('auth/register', inscription, name='inscription'),
    path('auth/index', user_dashboard, name='userHome'),
    path('profil/', userProfile, name='userProfile'),
    path('profil/edit/', editProfile, name='editProfile'),
    path('logout/', logout_view, name='logout'),
    path('newproject/', createProject, name='newproject'),
    path('newproject/<int:project_id>/addtask/', addTask, name='addtask'),
    path('projects/<int:project_id>/edit/', editProject, name='editProject'),
    path('projects/<int:project_id>/delete/', deleteProject, name='deleteProject'),
    path('project/<int:project_id>/', showProject, name='projectDetail'),
    path('task/<int:task_id>/', showTask, name='taskDetail'),
    path('admin/', admin.site.urls),
]
