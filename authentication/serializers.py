from rest_framework import serializers
from authentication.models import User
from gtachesapp.serializers import ProjectSerializer


class UserSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_teacher', 'is_student', 'avatar', 'projects')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

        def create(self, validated_data):
            # Make sure that password passing through HTTP to be hashed
            user = User.objects.create_user(**validated_data)
            return user
