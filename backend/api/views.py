from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import StudentProfile, Skill, Experience, Education
from .serializers import StudentProfileSerializer, SkillSerializer, ExperienceSerializer, EducationSerializer
from django.db.models import Q

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_current_user(request):
    """Return current user info including role (is_staff)"""
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
    })

class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['full_name', 'prodi', 'skills__name']

    def get_queryset(self):
        
        if self.request.user.is_staff or self.request.user.is_superuser:
            return StudentProfile.objects.select_related('user').prefetch_related('skills', 'experiences', 'educations').order_by('-id').all()
        
        # Allow user to see their own profile even if inactive
        queryset = StudentProfile.objects.filter(is_active=True).select_related('user').prefetch_related('skills', 'experiences', 'educations').order_by('-id')

        if self.request.user.is_authenticated:
             # Add the user's own profile to the queryset if it's not already there (e.g. if inactive)
             # However, simple union or OR logic is better
             return StudentProfile.objects.filter(
                 Q(is_active=True) | Q(user=self.request.user)
             ).select_related('user').prefetch_related('skills', 'experiences', 'educations').order_by('-id').distinct()

        return queryset

    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        try:
            profile = request.user.profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Profil belum dibuat."}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        
        elif request.method in ['PUT', 'PATCH']:
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def toggle_active(self, request, pk=None):
        student = self.get_object()
        student.is_active = not student.is_active
        student.save()
        return Response({
            'id': student.id,
            'full_name': student.full_name,
            'is_active': student.is_active,
            'message': f"Profil {'diaktifkan' if student.is_active else 'dinonaktifkan'}"
        })

    def perform_create(self, serializer):
        # Cek apakah user sudah punya profil sebelumnya untuk mencegah error 500
        if hasattr(self.request.user, 'profile'):
            raise ValidationError({"detail": "User ini sudah memiliki profile mahasiswa."})
        # Set is_active=True by default for new profiles
        serializer.save(user=self.request.user, is_active=True)

class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(student__user=self.request.user)

    def perform_create(self, serializer):
        try:
            # Pastikan profil sudah ada sebelum simpan skill
            serializer.save(student=self.request.user.profile)
        except StudentProfile.DoesNotExist:
            raise ValidationError({"detail": "Harap simpan Biodata Diri terlebih dahulu sebelum menambah Skill."})

class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(student__user=self.request.user)

    def perform_create(self, serializer):
        try:
            # Pastikan profil sudah ada sebelum simpan experience
            serializer.save(student=self.request.user.profile)
        except StudentProfile.DoesNotExist:
            raise ValidationError({"detail": "Harap simpan Biodata Diri terlebih dahulu sebelum menambah Pengalaman."})

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Education.objects.filter(student__user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(student=self.request.user.profile)
        except StudentProfile.DoesNotExist:
            raise ValidationError({"detail": "Harap simpan Biodata Diri terlebih dahulu sebelum menambah Riwayat Pendidikan."})
