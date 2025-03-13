from rest_framework import serializers
from authentication.models import User
from gtachesapp.serializers import ProjectSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_teacher', 'is_student', 'avatar')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        # We try to hash the password
        password = validated_data.pop('password')  # We collect and delete the password from validated data
        user = User.objects.create_user(password=password, **validated_data)  # Encrypt password
        return user
