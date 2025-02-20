from django.shortcuts import render

# Create your students_views here.
from gtachesapp.models import Task, Project


def student_dashboard(request):
    student = request.user
    tasks = Task.objects.filter(assigned_to_id=student.id)
    projects = Project.objects.filter(owner=student)

    # Vérifie si l'étudiant n'a ni tâche ni projet
    no_data = not tasks and not projects

    return render(request, 'students_views/index.html', {
        'tasks': tasks,
        'projects': projects,
        'no_data': no_data
    })
