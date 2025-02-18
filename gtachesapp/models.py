from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class Task(models.Model):
    title = models.CharField(max_length=255)  # Titre de la tâche
    description = models.TextField(blank=True, null=True)  # Description de la tâche
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='tasks')
    assigned_to = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name='tasks')  # Utilisateur assigné
    status = models.CharField(max_length=20, choices=[('pending', 'En attente'), ('in_progress', 'En cours'),
                                                      ('completed', 'Terminée')], default='pending')
    due_date = models.DateField()  # Date limite
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Project(models.Model):
    name = models.CharField(max_length=255)  # Nom du projet
    description = models.TextField(blank=True, null=True)  # Description du projet
    owner = models.ForeignKey('User', on_delete=models.CASCADE, related_name='projects')  # Créateur du projet
    members = models.ManyToManyField('User', related_name='project_members')  # Membres du projet
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création
    updated_at = models.DateTimeField(auto_now=True)  # Date de mise à jour


class User(AbstractUser):
    is_student = models.BooleanField(default=False)  # Indique si l'utilisateur est un étudiant
    is_teacher = models.BooleanField(default=False)  # Indique si l'utilisateur est un professeur
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  # Avatar de l'utilisateur


class Evaluation(models.Model):
    teacher = models.ForeignKey('User', on_delete=models.CASCADE, related_name='evaluations')
    period = models.CharField(max_length=10, choices=[('quarter', 'Trimestriel'), ('year', 'Annuel')])
    total_tasks = models.IntegerField(default=0)  # Total des tâches assignées
    completed_tasks = models.IntegerField(default=0)  # Tâches terminées dans les délais
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Prime attribuée
