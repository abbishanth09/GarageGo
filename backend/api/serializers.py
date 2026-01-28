from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Vehicle, Service, Booking
from datetime import datetime, date
import re


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'phone', 'role', 'password', 'password2']
        read_only_fields = ['id']
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return data
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        # Additional email format validation
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError("Invalid email format")
        return value
    
    def validate_phone(self, value):
        if not value:
            return value  # Phone is optional
        
        # Remove spaces and dashes
        clean_phone = re.sub(r'[\s-]', '', value)
        
        # Sri Lankan mobile: 07X XXX XXXX (10 digits starting with 07)
        mobile_regex = r'^07[0-9]{8}$'
        # Sri Lankan landline: 0XX XXX XXXX (9-10 digits starting with 0)
        landline_regex = r'^0[1-9][0-9]{7,8}$'
        
        if not (re.match(mobile_regex, clean_phone) or re.match(landline_regex, clean_phone)):
            raise serializers.ValidationError(
                "Invalid Sri Lankan phone number. Format: 0771234567 (mobile) or 0112345678 (landline)"
            )
        
        return clean_phone
    
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid credentials")
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled")
        else:
            raise serializers.ValidationError("Must include email and password")
        
        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'phone', 'role', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class MechanicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone']
        read_only_fields = ['id']


class VehicleSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    owner_email = serializers.CharField(source='owner.email', read_only=True)
    
    class Meta:
        model = Vehicle
        fields = ['id', 'owner', 'owner_name', 'owner_email', 'vehicle_number', 'make', 'model', 'year', 'color', 'created_at', 'updated_at']
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']
    
    def validate_vehicle_number(self, value):
        vehicle_id = self.instance.id if self.instance else None
        if Vehicle.objects.filter(vehicle_number=value).exclude(id=vehicle_id).exists():
            raise serializers.ValidationError("Vehicle number already exists")
        return value
    
    def validate_year(self, value):
        current_year = datetime.now().year
        if value < 1900 or value > current_year + 1:
            raise serializers.ValidationError(f"Year must be between 1900 and {current_year + 1}")
        return value


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'duration_minutes', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than 0")
        return value
    
    def validate_duration_minutes(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be greater than 0")
        return value


class BookingSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    customer_email = serializers.CharField(source='customer.email', read_only=True)
    vehicle_number = serializers.CharField(source='vehicle.vehicle_number', read_only=True)
    vehicle_details = serializers.SerializerMethodField()
    service_name = serializers.CharField(source='service.name', read_only=True)
    service_price = serializers.DecimalField(source='service.price', max_digits=10, decimal_places=2, read_only=True)
    mechanic_name = serializers.CharField(source='mechanic.username', read_only=True, allow_null=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'booking_number', 'customer', 'customer_name', 'customer_email',
            'vehicle', 'vehicle_number', 'vehicle_details',
            'service', 'service_name', 'service_price',
            'mechanic', 'mechanic_name',
            'booking_date', 'time_slot', 'status', 'payment_status',
            'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'booking_number', 'customer', 'created_at', 'updated_at']
    
    def get_vehicle_details(self, obj):
        return f"{obj.vehicle.make} {obj.vehicle.model} ({obj.vehicle.year})"
    
    def validate_booking_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("Booking date cannot be in the past")
        return value
    
    def validate_vehicle(self, value):
        request = self.context.get('request')
        if request and request.user.role == 'customer':
            if value.owner != request.user:
                raise serializers.ValidationError("You can only book for your own vehicles")
        return value
    
    def validate(self, data):
        booking_date = data.get('booking_date')
        time_slot = data.get('time_slot')
        
        # Check for double booking (skip for updates)
        if booking_date and time_slot:
            booking_id = self.instance.id if self.instance else None
            existing_booking = Booking.objects.filter(
                booking_date=booking_date,
                time_slot=time_slot
            ).exclude(id=booking_id).first()
            
            if existing_booking:
                raise serializers.ValidationError({
                    "time_slot": f"Time slot {time_slot} on {booking_date} is already booked"
                })
        
        return data


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['vehicle', 'service', 'booking_date', 'time_slot', 'notes']
    
    def validate_booking_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("Booking date cannot be in the past")
        return value
    
    def validate_vehicle(self, value):
        request = self.context.get('request')
        if request and request.user.role == 'customer':
            if value.owner != request.user:
                raise serializers.ValidationError("You can only book for your own vehicles")
        return value
    
    def validate(self, data):
        booking_date = data.get('booking_date')
        time_slot = data.get('time_slot')
        
        # Check for double booking
        if Booking.objects.filter(booking_date=booking_date, time_slot=time_slot).exists():
            raise serializers.ValidationError({
                "time_slot": f"Time slot {time_slot} on {booking_date} is already booked"
            })
        
        return data
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['customer'] = request.user
        return super().create(validated_data)


class BookingUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['status', 'payment_status', 'mechanic', 'notes']
    
    def validate_mechanic(self, value):
        if value and value.role != 'mechanic':
            raise serializers.ValidationError("Assigned user must be a mechanic")
        return value
    
    def validate(self, data):
        request = self.context.get('request')
        
        # Only admin can update status, payment_status, and assign mechanic
        if request and request.user.role != 'admin':
            if 'status' in data or 'payment_status' in data or 'mechanic' in data:
                raise serializers.ValidationError("Only admin can update these fields")
        
        return data
