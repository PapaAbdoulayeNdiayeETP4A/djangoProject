from rest_framework import serializers
from gtachesapp.models import Project, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'owner', 'tasks')
