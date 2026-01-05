from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .controllers import (
    register, login, profile, get_mechanics,
    vehicle_list_create, vehicle_detail,
    service_list_create, service_detail,
    booking_list_create, booking_detail, approve_booking,
    update_booking_status, update_payment_status, assign_mechanic,
    mechanic_bookings, available_time_slots,
)

urlpatterns = [
    # Authentication
    path('auth/register/', register, name='register'),
    path('auth/login/', login, name='login'),
    path('auth/profile/', profile, name='profile'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/mechanics/', get_mechanics, name='get_mechanics'),
    
    # Vehicles
    path('vehicles/', vehicle_list_create, name='vehicle_list_create'),
    path('vehicles/<uuid:vehicle_id>/', vehicle_detail, name='vehicle_detail'),
    
    # Services
    path('services/', service_list_create, name='service_list_create'),
    path('services/<uuid:service_id>/', service_detail, name='service_detail'),
    
    # Bookings
    path('bookings/', booking_list_create, name='booking_list_create'),
    path('bookings/<uuid:booking_id>/', booking_detail, name='booking_detail'),
    path('bookings/<uuid:booking_id>/approve/', approve_booking, name='approve_booking'),
    path('bookings/<uuid:booking_id>/status/', update_booking_status, name='update_booking_status'),
    path('bookings/<uuid:booking_id>/payment/', update_payment_status, name='update_payment_status'),
    path('bookings/<uuid:booking_id>/assign-mechanic/', assign_mechanic, name='assign_mechanic'),
    path('bookings/mechanic/my-bookings/', mechanic_bookings, name='mechanic_bookings'),
    path('bookings/available-slots/', available_time_slots, name='available_time_slots'),
]
