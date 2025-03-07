# urls_projects.py
from django.urls import path
from .views import createProject, addTask, editProject, deleteProject, showProject, ProjectListCreateView, \
    ProjectUpdateDestroyView

urlpatterns = [
    path('newproject/', createProject, name='newproject'),
    path('newproject/<int:project_id>/addtask/', addTask, name='addtask'),
    path('projects/<int:project_id>/edit/', editProject, name='editProject'),
    path('projects/<int:project_id>/delete/', deleteProject, name='deleteProject'),
    path('project/<int:project_id>/', showProject, name='projectDetail'),
    path('api/project/', ProjectListCreateView.as_view(), name='projectCreateList_api'),
    path('api/project/<int:pk>', ProjectUpdateDestroyView.as_view(), name='projectUpdateDestroy_api')
]
