# urls_projects.py
from django.urls import path
from .views import createProject, addTask, editProject, deleteProject, showProject, ProjectListCreateView, \
    ProjectUpdateDestroyView, TaskListCreateView, TaskUpdateDestroyView

urlpatterns = [
    path('newproject/', createProject, name='newproject'),
    path('newproject/<int:project_id>/addtask/', addTask, name='addtask'),
    path('projects/<int:project_id>/edit/', editProject, name='editProject'),
    path('projects/<int:project_id>/delete/', deleteProject, name='deleteProject'),
    path('project/<int:project_id>/', showProject, name='projectDetail'),
    path('api/project/', ProjectListCreateView.as_view(), name='projectCreateList_api'),
    path('api/project/<int:pk>', ProjectUpdateDestroyView.as_view(), name='projectUpdateDestroy_api'),
    path('api/task/', TaskListCreateView.as_view(), name='taskCreateList_api'),
    path('api/task/<int:pk>', TaskUpdateDestroyView.as_view(), name='taskUpdateDestroy_api')
]
