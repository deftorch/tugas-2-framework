from rest_framework import serializers
from .models import StudentProfile, Skill, Experience, Education
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

class EducationSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(required=False, allow_null=True)

    class Meta:
        model = Education
        fields = ['id', 'school', 'degree', 'start_date', 'end_date', 'city', 'description']

class StudentProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True) 
    educations = EducationSerializer(many=True, read_only=True)

    # We use a custom field for the read-only user email, but we also have an editable 'email' field in the model.
    # To avoid confusion, let's call the user's login email 'login_email'.
    login_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = StudentProfile
        fields = [
            'id', 'nim', 'full_name', 'login_email', 'email', 'phone',
            'city', 'nationality', 'visa_status', 'marital_status',
            'prodi', 'bio', 'photo', 'linkedin_link',
            'skills', 'experiences', 'educations', 'is_active'
        ]
        extra_kwargs = {
            'nim': {'required': False, 'allow_blank': True},
            'full_name': {'required': False, 'allow_blank': True},
            'prodi': {'required': False, 'allow_blank': True},
        }
