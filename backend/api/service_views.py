from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Service
from .serializers import ServiceSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def service_list_create(request):
    """
    GET: List all active services (all users)
    POST: Create new service (admin only)
    """
    if request.method == 'GET':
        # Show only active services to non-admin users
        if request.user.role == 'admin':
            services = Service.objects.all()
        else:
            services = Service.objects.filter(is_active=True)
        
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can create services'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def service_detail(request, service_id):
    """
    GET: Retrieve service details
    PUT/PATCH: Update service (admin only)
    DELETE: Delete service (admin only)
    """
    service = get_object_or_404(Service, id=service_id)
    
    if request.method == 'GET':
        serializer = ServiceSerializer(service)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can update services'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = ServiceSerializer(
            service,
            data=request.data,
            partial=(request.method == 'PATCH')
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can delete services'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if service has active bookings
        active_bookings = service.bookings.exclude(status__in=['completed', 'cancelled']).count()
        if active_bookings > 0:
            return Response(
                {'error': f'Cannot delete service with {active_bookings} active booking(s)'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        service.delete()
        return Response({'message': 'Service deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
