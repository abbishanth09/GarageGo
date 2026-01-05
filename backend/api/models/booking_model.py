from django.db import models
import uuid


class Booking(models.Model):
    """Booking Model - represents service bookings"""
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    PAYMENT_STATUS_CHOICES = (
        ('unpaid', 'Unpaid'),
        ('paid', 'Paid'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking_number = models.CharField(max_length=20, unique=True, editable=False)
    customer = models.ForeignKey('api.User', on_delete=models.CASCADE, related_name='bookings')
    vehicle = models.ForeignKey('api.Vehicle', on_delete=models.CASCADE, related_name='bookings')
    service = models.ForeignKey('api.Service', on_delete=models.CASCADE, related_name='bookings')
    mechanic = models.ForeignKey('api.User', on_delete=models.SET_NULL, null=True, blank=True, 
                                  related_name='assigned_bookings', limit_choices_to={'role': 'mechanic'})
    booking_date = models.DateField()
    time_slot = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='unpaid')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.booking_number:
            last_booking = Booking.objects.order_by('-created_at').first()
            if last_booking and last_booking.booking_number:
                last_number = int(last_booking.booking_number.replace('BK', ''))
                new_number = last_number + 1
            else:
                new_number = 1
            self.booking_number = f"BK{new_number:05d}"
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.booking_number} - {self.customer.email} - {self.service.name}"
    
    class Meta:
        db_table = 'api_booking'
        ordering = ['-booking_date', '-time_slot']
        unique_together = ['booking_date', 'time_slot']
