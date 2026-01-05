from django.db import models
import uuid


class Vehicle(models.Model):
    """Vehicle Model - represents customer vehicles"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey('api.User', on_delete=models.CASCADE, related_name='vehicles')
    vehicle_number = models.CharField(max_length=20, unique=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=30, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.vehicle_number} - {self.make} {self.model}"
    
    class Meta:
        db_table = 'api_vehicle'
        ordering = ['-created_at']
