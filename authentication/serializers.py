from rest_framework import serializers
from authentication.models import User
from gtachesapp.serializers import ProjectSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_teacher', 'is_student', 'avatar')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        # Assurez-vous que le mot de passe est haché
        password = validated_data.pop('password')  # Récupère et supprime le mot de passe des données validées
        user = User.objects.create_user(password=password, **validated_data)  # Hash automatiquement le mot de passe
        return user
