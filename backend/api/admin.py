from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Vehicle, Service, Booking


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'username', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username', 'phone', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role'),
        }),
    )
    search_fields = ('email', 'username')
    ordering = ('email',)


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('vehicle_number', 'owner', 'make', 'model', 'year')
    list_filter = ('make', 'year')
    search_fields = ('vehicle_number', 'owner__email', 'make', 'model')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration_minutes', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'description')


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('booking_number', 'customer', 'service', 'booking_date', 'status', 'payment_status')
    list_filter = ('status', 'payment_status', 'booking_date')
    search_fields = ('booking_number', 'customer__email', 'service__name')
    date_hierarchy = 'booking_date'
