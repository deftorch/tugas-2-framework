from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import StudentProfile, Education
from django.urls import reverse

class EducationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='student', password='password123')
        self.client.force_authenticate(user=self.user)
        self.profile = StudentProfile.objects.create(user=self.user, full_name='Test Student')
        self.url = reverse('education-list')

    def test_add_education(self):
        data = {
            'school': 'University of Test',
            'degree': 'Bachelor',
            'start_date': '2020-01-01',
            'city': 'New York'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Education.objects.count(), 1)
        self.assertEqual(Education.objects.get().student, self.profile)

    def test_get_education(self):
        Education.objects.create(
            student=self.profile,
            school='University of Test',
            degree='Bachelor'
        )
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Handle pagination or direct list
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['school'], 'University of Test')

class NewProfileFieldsTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='student', password='password123')
        self.client.force_authenticate(user=self.user)
        self.profile = StudentProfile.objects.create(user=self.user, full_name='Test Student')
        self.me_url = reverse('student-me')

    def test_update_contact_info(self):
        data = {
            'email': 'contact@test.com',
            'phone': '123456789',
            'city': 'Jakarta',
            'nationality': 'Indonesia',
            'visa_status': 'Citizen',
            'marital_status': 'Single'
        }
        response = self.client.patch(self.me_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.email, 'contact@test.com')
        self.assertEqual(self.profile.phone, '123456789')
        self.assertEqual(self.profile.city, 'Jakarta')
