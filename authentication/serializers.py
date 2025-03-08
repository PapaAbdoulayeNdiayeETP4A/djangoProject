from rest_framework import serializers
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_teacher', 'is_student', 'avatar')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

        def create(self, validated_data):
            # Make sure that password passing through HTTP to be hashed
            user = User.objects.create_user(**validated_data)
            return user
