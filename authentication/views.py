from django.contrib.auth import login as auth_login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from authentication.models import User
from authentication.serializers import UserSerializer
from gtachesapp.models import Task, Project


def connexion(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = authenticate(request, email=email, password=password)

        if user is not None:
            auth_login(request, user)  # Connecter l'utilisateur
            messages.success(request, f"Bienvenue, {user.username} !")
            if user.is_student or user.is_teacher:
                return redirect('userHome')

        else:
            messages.error(request, "Email ou mot de passe incorrect.")

    return render(request, "registration/connexion.html")


def inscription(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password1")
        confirm_password = request.POST.get("password2")
        user_type = request.POST.get("user_type")
        avatar = request.FILES.get("avatar")

        # Vérifier que les mots de passe correspondent
        if password != confirm_password:
            messages.error(request, "Les mots de passe ne correspondent pas.")

        # Vérifier que l'email n'existe pas déjà
        if User.objects.filter(email=email).exists():
            messages.error(request, "Un compte avec cet email existe déjà.")
            return render(request, "registration/inscription.html")

        # Créer un utilisateur
        if user_type == 'student':
            my_user = User.objects.create(
                username=username,
                password=make_password(password),
                email=email,
                is_student=True,
                is_teacher=False,
                avatar=avatar
            )
            my_user.save()
        else:
            # Créer l'utilisateur
            my_user = User.objects.create(
                username=username,
                password=make_password(password),
                email=email,
                is_student=False,
                is_teacher=True,
                avatar=avatar
            )
            my_user.save()
        messages.success(request, "Inscription réussie ! Connectez-vous.")
        return redirect("connexion")

    return render(request, "registration/inscription.html")


@login_required
def userProfile(request):
    return render(request, 'profiles/profile.html')


@login_required
def editProfile(request):
    if request.method == "POST":
        user = request.user
        username = request.POST["username"]
        email = request.POST["email"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        avatar = request.FILES.get('avatar')

        # Vérification de l'unicité du nom d'utilisateur (s'il est modifié)
        if User.objects.filter(username=username).exclude(id=user.id).exists():
            messages.error(request, "Ce nom d'utilisateur est déjà pris.")
        elif User.objects.filter(email=email).exclude(id=user.id).exists():
            messages.error(request, "Cet email est déjà utilisé.")
        else:
            user.username = username
            user.email = email
            user.first_name = first_name
            user.last_name = last_name
            user.avatar = avatar
            user.save()
            messages.success(request, "Votre profil a été mis à jour avec succès.")
            return redirect("userProfile")  # Redirection vers le profil

    return render(request, "profiles/editprofile.html")


def user_dashboard(request):
    user = request.user
    tasks = Task.objects.filter(assigned_to_id=user.id)
    projects = Project.objects.filter(owner=user)

    # Vérifie si l'étudiant n'a ni tâche ni projet
    no_data = not tasks and not projects

    return render(request, 'home/index.html', {
        'tasks': tasks,
        'projects': projects,
        'no_data': no_data
    })


def logout_view(request):
    logout(request)
    return redirect('connexion')


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = {IsAuthenticated}


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'is_student': user.is_student,
        'is_teacher': user.is_teacher,
    })
