"""
Dashboard Controller
Handles admin dashboard statistics and analytics
Member 5 can use these functions to display dashboard data
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Sum
from django.utils import timezone
from datetime import timedelta
from api.models import User, Service, Booking
from api.serializers import BookingSerializer, ServiceSerializer, UserSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_statistics(request):
    """
    Get overall dashboard statistics for admin
    Returns counts and stats for all entities
    """
    if not (hasattr(request.user, 'role') and request.user.role == 'admin'):
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Count users by role
    total_customers = User.objects.filter(role='customer', is_active=True).count()
    total_mechanics = User.objects.filter(role='mechanic', is_active=True).count()
    
    # Count services
    total_services = Service.objects.filter(is_active=True).count()
    
    # Count bookings by status
    total_bookings = Booking.objects.count()
    pending_bookings = Booking.objects.filter(status='pending').count()
    approved_bookings = Booking.objects.filter(status='approved').count()
    in_progress_bookings = Booking.objects.filter(status='in_progress').count()
    completed_bookings = Booking.objects.filter(status='completed').count()
    
    # Payment statistics
    total_paid = Booking.objects.filter(payment_status='paid').count()
    total_unpaid = Booking.objects.filter(payment_status='unpaid').count()
    
    # Revenue calculation
    total_revenue = Booking.objects.filter(
        status='completed',
        payment_status='paid'
    ).aggregate(total=Sum('service__price'))['total'] or 0
    
    # Bookings this month
    today = timezone.now().date()
    month_start = today.replace(day=1)
    bookings_this_month = Booking.objects.filter(
        booking_date__gte=month_start
    ).count()
    
    return Response({
        'users': {
            'total_customers': total_customers,
            'total_mechanics': total_mechanics,
        },
        'services': {
            'total_active_services': total_services,
        },
        'bookings': {
            'total_bookings': total_bookings,
            'pending': pending_bookings,
            'approved': approved_bookings,
            'in_progress': in_progress_bookings,
            'completed': completed_bookings,
        },
        'payments': {
            'total_paid': total_paid,
            'total_unpaid': total_unpaid,
        },
        'revenue': {
            'total_revenue': float(total_revenue),
        },
        'monthly': {
            'bookings_this_month': bookings_this_month,
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def booking_status_chart_data(request):
    """
    Get booking distribution by status for chart/graph
    """
    if not (hasattr(request.user, 'role') and request.user.role == 'admin'):
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    status_counts = Booking.objects.values('status').annotate(count=Count('id'))
    
    chart_data = {
        'labels': [],
        'data': []
    }
    
    for item in status_counts:
        status_label = dict(Booking.STATUS_CHOICES).get(item['status'], item['status'])
        chart_data['labels'].append(status_label)
        chart_data['data'].append(item['count'])
    
    return Response(chart_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mechanic_workload(request):
    """
    Get workload for each mechanic
    Shows how many bookings assigned to each mechanic
    """
    if not (hasattr(request.user, 'role') and request.user.role == 'admin'):
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    mechanics = User.objects.filter(role='mechanic', is_active=True)
    
    workload_data = []
    for mechanic in mechanics:
        total_assigned = Booking.objects.filter(
            mechanic=mechanic
        ).count()
        
        completed = Booking.objects.filter(
            mechanic=mechanic,
            status='completed'
        ).count()
        
        in_progress = Booking.objects.filter(
            mechanic=mechanic,
            status='in_progress'
        ).count()
        
        workload_data.append({
            'mechanic_id': str(mechanic.id),
            'mechanic_name': mechanic.username,
            'mechanic_email': mechanic.email,
            'total_assigned': total_assigned,
            'completed': completed,
            'in_progress': in_progress,
            'pending': total_assigned - completed - in_progress,
        })
    
    return Response(workload_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recent_bookings(request):
    """
    Get 5 most recent bookings for dashboard overview
    """
    if not (hasattr(request.user, 'role') and request.user.role == 'admin'):
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    recent = Booking.objects.all().order_by('-created_at')[:5]
    serializer = BookingSerializer(recent, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def popular_services(request):
    """
    Get most popular services by number of bookings
    """
    if not (hasattr(request.user, 'role') and request.user.role == 'admin'):
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    popular = Service.objects.annotate(
        booking_count=Count('bookings')
    ).order_by('-booking_count')[:5]
    
    serializer = ServiceSerializer(popular, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def top_customers(request):
    """
    Get top 5 customers with most bookings
    """
    if not (hasattr(request.user, 'role') and request.user.role == 'admin'):
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    top = User.objects.filter(role='customer').annotate(
        booking_count=Count('bookings')
    ).order_by('-booking_count')[:5]
    
    serializer = UserSerializer(top, many=True)
    return Response(serializer.data)
