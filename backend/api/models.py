"""
Models Package Import
This file imports all models from the models package for backward compatibility
"""
from .models import User, UserManager, Vehicle, Service, Booking

__all__ = ['User', 'UserManager', 'Vehicle', 'Service', 'Booking']
