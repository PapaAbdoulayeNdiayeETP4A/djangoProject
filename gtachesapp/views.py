from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from authentication.models import User
from gtachesapp.models import Project, Task
from gtachesapp.serializers import ProjectSerializer, TaskSerializer


def createProject(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')

        if not name:
            messages.error(request, "Le nom du projet est requis.")
        else:
            project = Project.objects.create(
                name=name,
                description=description,
                owner=request.user
            )
            project.members.add(request.user)  # Le créateur est automatiquement membre

            # Stocke l'ID du projet en session
            request.session["project_id"] = project.id

            return redirect('addtask', project.id)

    return render(request, 'projects/createproject.html')


def editProject(request, project_id):
    project = get_object_or_404(Project, id=project_id)

    if request.method == 'POST':
        project.name = request.POST.get('name')
        project.description = request.POST.get('description')
        project.save()
        messages.success(request, "Projet modifié avec succès !")
        return redirect('userHome')  # Redirige vers la liste des projets

    return render(request, 'projects/editproject.html', {'project': project})


def showProject(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    return render(request, 'projects/showproject.html', {'project': project})


def showTask(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    return render(request, 'tasks/showtask.html', {'task': task})


def deleteProject(request, project_id):
    project = get_object_or_404(Project, id=project_id)

    if request.method == "POST":
        project.delete()
        messages.success(request, "Projet supprimé avec succès !")
        return redirect('userHome')  # Redirige après suppression

    return redirect('userHome')


def addTask(request, project_id):
    users = User.objects.all()
    project = get_object_or_404(Project, id=project_id)

    if request.method == "POST":
        title = request.POST.get('title')
        description = request.POST.get('description')
        due_date = request.POST.get('due_date')
        assigned_to_id = request.POST.get('assigned_to')
        status = request.POST.get('status')

        if title:
            assigned_to = User.objects.get(id=assigned_to_id) if assigned_to_id else None
            Task.objects.create(
                title=title,
                description=description,
                due_date=due_date,
                project=project,
                assigned_to=assigned_to,
                status=status
            )

            # Marquer qu'une tâche a été ajoutée
            request.session["task_added"] = True

            messages.success(request, "Tâche ajoutée avec succès !")
            return redirect("addtask", project_id=project.id)  # Reste sur la page

        messages.error(request, "Le titre de la tâche est requis.")

    return render(request, "tasks/addtask.html", {"project": project, "users": users})


class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = {IsAuthenticated}


class ProjectUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = {IsAuthenticated}


class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = {IsAuthenticated}


class TaskUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = {IsAuthenticated}
