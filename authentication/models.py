from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_student = models.BooleanField(default=False)  # Indique si l'utilisateur est un étudiant
    is_teacher = models.BooleanField(default=False)  # Indique si l'utilisateur est un professeur
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  # Avatar de l'utilisateur
    USERNAME_FIELD = 'email'  # Django doit utiliser 'email' pour l'authentification
    REQUIRED_FIELDS = []  # Empêche Django de demander un username obligatoire