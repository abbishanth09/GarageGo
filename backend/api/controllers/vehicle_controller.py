"""
Vehicle Controller
Handles vehicle CRUD operations
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from api.models import Vehicle
from api.serializers import VehicleSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def vehicle_list_create(request):
    """
    GET: List vehicles (customer sees own, admin sees all)
    POST: Create new vehicle (customer only)
    """
    if request.method == 'GET':
        if request.user.role == 'customer':
            vehicles = Vehicle.objects.filter(owner=request.user)
        else:
            vehicles = Vehicle.objects.all()
        
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if request.user.role != 'customer':
            return Response(
                {'error': 'Only customers can add vehicles'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def vehicle_detail(request, vehicle_id):
    """
    GET: Retrieve vehicle details
    PUT/PATCH: Update vehicle
    DELETE: Delete vehicle
    """
    vehicle = get_object_or_404(Vehicle, id=vehicle_id)
    
    # Permission check - customers can only access their own vehicles
    if request.user.role == 'customer' and vehicle.owner != request.user:
        return Response(
            {'error': 'You can only access your own vehicles'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    if request.method == 'GET':
        serializer = VehicleSerializer(vehicle)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        if request.user.role == 'customer' and vehicle.owner != request.user:
            return Response(
                {'error': 'You can only update your own vehicles'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = VehicleSerializer(
            vehicle,
            data=request.data,
            partial=(request.method == 'PATCH')
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        if request.user.role == 'customer' and vehicle.owner != request.user:
            return Response(
                {'error': 'You can only delete your own vehicles'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if vehicle has active bookings
        active_bookings = vehicle.bookings.exclude(status__in=['completed', 'cancelled']).count()
        if active_bookings > 0:
            return Response(
                {'error': f'Cannot delete vehicle with {active_bookings} active booking(s)'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        vehicle.delete()
        return Response({'message': 'Vehicle deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
