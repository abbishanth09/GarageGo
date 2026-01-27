"""
Controllers Package
Handles business logic and request processing (Controller layer in MVC)
"""
from .auth_controller import register, login, profile, get_mechanics
from .vehicle_controller import vehicle_list_create, vehicle_detail
from .service_controller import service_list_create, service_detail
from .booking_controller import (
    booking_list_create,
    booking_detail,
    approve_booking,
    update_booking_status,
    update_payment_status,
    assign_mechanic,
    mechanic_bookings,
    available_time_slots,
)
from .user_controller import get_users_by_role, toggle_user_active, delete_user

__all__ = [
    'register', 'login', 'profile', 'get_mechanics',
    'vehicle_list_create', 'vehicle_detail',
    'service_list_create', 'service_detail',
    'booking_list_create', 'booking_detail', 'approve_booking',
    'update_booking_status', 'update_payment_status', 'assign_mechanic',
    'mechanic_bookings', 'available_time_slots',
    'get_users_by_role', 'toggle_user_active', 'delete_user',
]
