from django.db import models
from django.contrib.auth.models import User

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    nim = models.CharField(max_length=20, blank=True, null=True) 
    full_name = models.CharField(max_length=100, blank=True, null=True)
    prodi = models.CharField(max_length=100, blank=True, null=True)
    
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)

    # New Fields
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    nationality = models.CharField(max_length=100, blank=True, null=True)
    visa_status = models.CharField(max_length=100, blank=True, null=True)
    marital_status = models.CharField(max_length=50, blank=True, null=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.full_name or self.user.username

class Skill(models.Model):
    student = models.ForeignKey(StudentProfile, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Experience(models.Model):
    student = models.ForeignKey(StudentProfile, related_name='experiences', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)      
    company = models.CharField(max_length=100)    
    start_date = models.DateField(null=True, blank=True) # Buat optional
    end_date = models.DateField(null=True, blank=True) 
    description = models.TextField(blank=True)    
    
    def __str__(self):
        return f"{self.title} at {self.company}"

class Education(models.Model):
    student = models.ForeignKey(StudentProfile, related_name='educations', on_delete=models.CASCADE)
    school = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.degree} at {self.school}"
