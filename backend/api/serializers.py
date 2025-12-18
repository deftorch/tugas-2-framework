from rest_framework import serializers
from .models import StudentProfile, Skill, Experience 
from django.contrib.auth.models import User

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class ExperienceSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(required=False, allow_null=True)
    
    class Meta:
        model = Experience
        fields = ['id', 'title', 'company', 'start_date', 'end_date', 'description']

class StudentProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True) 
    email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = StudentProfile
        fields = ['id', 'nim', 'full_name', 'email', 'prodi', 'bio', 'photo', 'linkedin_link', 'skills', 'experiences', 'is_active']
        extra_kwargs = {
            'nim': {'required': False, 'allow_blank': True},
            'full_name': {'required': False, 'allow_blank': True},
            'prodi': {'required': False, 'allow_blank': True},
        }