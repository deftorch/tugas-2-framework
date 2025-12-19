from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import StudentProfile, Skill, Experience

class ModelTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.profile = StudentProfile.objects.create(
            user=self.user,
            full_name='Test User',
            nim='123456',
            prodi='Informatika'
        )

    def test_student_profile_str(self):
        self.assertEqual(str(self.profile), 'Test User')
        self.profile.full_name = ''
        self.profile.save()
        self.assertEqual(str(self.profile), 'testuser')

    def test_skill_str(self):
        skill = Skill.objects.create(student=self.profile, name='Python')
        self.assertEqual(str(skill), 'Python')

    def test_experience_str(self):
        exp = Experience.objects.create(
            student=self.profile,
            title='Developer',
            company='Tech Corp'
        )
        self.assertEqual(str(exp), 'Developer at Tech Corp')


class StudentAPITests(APITestCase):
    def setUp(self):
        # Create users
        self.user = User.objects.create_user(username='student', password='password123')
        self.admin = User.objects.create_superuser(username='admin', password='adminpassword')

        # URLs
        self.list_url = reverse('student-list')
        self.me_url = reverse('student-me')

        # Token (Using SimpleJWT logic simulation or force_authenticate)
        # For simplicity in APITestCase we can use client.force_authenticate

    def test_create_profile(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'full_name': 'New Student',
            'nim': 'A100',
            'prodi': 'Hukum'
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(StudentProfile.objects.count(), 1)
        self.assertEqual(StudentProfile.objects.get().user, self.user)

    def test_create_duplicate_profile_fails(self):
        self.client.force_authenticate(user=self.user)
        # Create first profile
        StudentProfile.objects.create(user=self.user, full_name='Existing')

        # Try to create second
        response = self.client.post(self.list_url, {'full_name': 'Duplicate'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_profile_me(self):
        self.client.force_authenticate(user=self.user)
        StudentProfile.objects.create(user=self.user, full_name='My Name')

        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['full_name'], 'My Name')

    def test_update_profile_me(self):
        self.client.force_authenticate(user=self.user)
        StudentProfile.objects.create(user=self.user, full_name='Old Name')

        data = {'full_name': 'New Name'}
        response = self.client.patch(self.me_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['full_name'], 'New Name')

    def test_public_list_students(self):
        # Create some students
        u1 = User.objects.create_user('u1', 'p1')
        StudentProfile.objects.create(user=u1, full_name='Student 1', is_active=True)

        u2 = User.objects.create_user('u2', 'p2')
        StudentProfile.objects.create(user=u2, full_name='Student 2', is_active=False)

        # Unauthenticated request
        self.client.logout()
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Should only see active students
        # Note: Depending on DRF settings, if no pagination, data is a list.
        # Check if 'results' key exists, otherwise treat data as list
        if isinstance(response.data, dict) and 'results' in response.data:
            results = response.data['results']
        else:
            results = response.data

        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['full_name'], 'Student 1')

    def test_admin_toggle_active(self):
        self.client.force_authenticate(user=self.admin)
        profile = StudentProfile.objects.create(user=self.user, full_name='Target', is_active=True)

        url = reverse('student-toggle-active', args=[profile.id])
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        profile.refresh_from_db()
        self.assertFalse(profile.is_active)

    def test_student_cannot_toggle_active(self):
        self.client.force_authenticate(user=self.user)
        profile = StudentProfile.objects.create(user=self.user, full_name='Target', is_active=True)

        url = reverse('student-toggle-active', args=[profile.id])
        response = self.client.post(url)

        # Expect 403 Forbidden because permissions.IsAdminUser is required
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class SkillExperienceTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='student', password='password123')
        self.client.force_authenticate(user=self.user)
        self.profile = StudentProfile.objects.create(user=self.user, full_name='Test Student')

        self.skill_url = reverse('skill-list')
        self.exp_url = reverse('experience-list')

    def test_add_skill(self):
        data = {'name': 'Django'}
        response = self.client.post(self.skill_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Skill.objects.count(), 1)
        self.assertEqual(Skill.objects.get().student, self.profile)

    def test_add_experience(self):
        data = {
            'title': 'Junior Dev',
            'company': 'StartUp',
            'start_date': '2023-01-01'
        }
        response = self.client.post(self.exp_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Experience.objects.count(), 1)
        self.assertEqual(Experience.objects.get().student, self.profile)

    def test_cannot_add_skill_without_profile(self):
        # Create user without profile
        user2 = User.objects.create_user('no_profile', 'pass')
        self.client.force_authenticate(user=user2)

        response = self.client.post(self.skill_url, {'name': 'Fail'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Biodata Diri', str(response.data))

    def test_get_own_skills_only(self):
        # Create another user and skill
        user2 = User.objects.create_user('other', 'pass')
        profile2 = StudentProfile.objects.create(user=user2)
        Skill.objects.create(student=profile2, name='Other Skill')

        # Create own skill
        Skill.objects.create(student=self.profile, name='My Skill')

        response = self.client.get(self.skill_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        if isinstance(response.data, dict) and 'results' in response.data:
            results = response.data['results']
        else:
            results = response.data

        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['name'], 'My Skill')
