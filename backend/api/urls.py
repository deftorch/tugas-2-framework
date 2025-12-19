from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, SkillViewSet, ExperienceViewSet, EducationViewSet, get_current_user

router = DefaultRouter()

router.register(r'students', StudentViewSet, basename='student')

router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'experiences', ExperienceViewSet, basename='experience')
router.register(r'educations', EducationViewSet, basename='education')

urlpatterns = [
    path('', include(router.urls)),
    path('users/me/', get_current_user, name='get_current_user'),
]
