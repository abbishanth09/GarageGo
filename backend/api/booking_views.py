from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Booking
from .serializers import BookingSerializer, BookingCreateSerializer, BookingUpdateSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def booking_list_create(request):
    """
    GET: List bookings (customer sees own, admin/mechanic see all)
    POST: Create new booking (customer only)
    """
    if request.method == 'GET':
        if request.user.role == 'customer':
            bookings = Booking.objects.filter(customer=request.user)
        else:
            bookings = Booking.objects.all()
        
        # Filtering
        status_filter = request.query_params.get('status', None)
        payment_filter = request.query_params.get('payment_status', None)
        date_filter = request.query_params.get('booking_date', None)
        
        if status_filter:
            bookings = bookings.filter(status=status_filter)
        if payment_filter:
            bookings = bookings.filter(payment_status=payment_filter)
        if date_filter:
            bookings = bookings.filter(booking_date=date_filter)
        
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if request.user.role != 'customer':
            return Response(
                {'error': 'Only customers can create bookings'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = BookingCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def booking_detail(request, booking_id):
    """
    GET: Retrieve booking details
    PUT/PATCH: Update booking (admin only)
    DELETE: Cancel booking
    """
    booking = get_object_or_404(Booking, id=booking_id)
    
    # Permission check
    if request.user.role == 'customer' and booking.customer != request.user:
        return Response(
            {'error': 'You can only access your own bookings'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    if request.method == 'GET':
        serializer = BookingSerializer(booking)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        if request.user.role == 'admin':
            serializer = BookingUpdateSerializer(
                booking, 
                data=request.data, 
                partial=(request.method == 'PATCH'),
                context={'request': request}
            )
        else:
            # Customers can only update notes
            if set(request.data.keys()) - {'notes'}:
                return Response(
                    {'error': 'Customers can only update notes'},
                    status=status.HTTP_403_FORBIDDEN
                )
            serializer = BookingSerializer(
                booking,
                data={'notes': request.data.get('notes')},
                partial=True
            )
        
        if serializer.is_valid():
            serializer.save()
            return Response(BookingSerializer(booking).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        if booking.status in ['completed', 'cancelled']:
            return Response(
                {'error': 'Cannot delete completed or cancelled bookings'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if request.user.role == 'customer':
            if booking.customer != request.user:
                return Response(
                    {'error': 'You can only cancel your own bookings'},
                    status=status.HTTP_403_FORBIDDEN
                )
            booking.status = 'cancelled'
            booking.save()
            return Response({'message': 'Booking cancelled successfully'})
        else:
            booking.delete()
            return Response({'message': 'Booking deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_booking(request, booking_id):
    """
    Admin approves booking and optionally assigns mechanic
    """
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can approve bookings'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    booking = get_object_or_404(Booking, id=booking_id)
    
    if booking.status != 'pending':
        return Response(
            {'error': 'Only pending bookings can be approved'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    booking.status = 'approved'
    
    mechanic_id = request.data.get('mechanic_id')
    if mechanic_id:
        from .models import User
        mechanic = get_object_or_404(User, id=mechanic_id, role='mechanic')
        booking.mechanic = mechanic
    
    booking.save()
    
    serializer = BookingSerializer(booking)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_booking_status(request, booking_id):
    """
    Update booking status (admin/mechanic)
    """
    if request.user.role not in ['admin', 'mechanic']:
        return Response(
            {'error': 'Only admin or mechanic can update status'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    booking = get_object_or_404(Booking, id=booking_id)
    
    # Mechanic can only update their assigned bookings
    if request.user.role == 'mechanic' and booking.mechanic != request.user:
        return Response(
            {'error': 'You can only update your assigned bookings'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    new_status = request.data.get('status')
    if not new_status:
        return Response(
            {'error': 'Status is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    valid_statuses = ['pending', 'approved', 'in_progress', 'completed', 'cancelled']
    if new_status not in valid_statuses:
        return Response(
            {'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    booking.status = new_status
    booking.save()
    
    serializer = BookingSerializer(booking)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_payment_status(request, booking_id):
    """
    Update payment status (admin only)
    """
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can update payment status'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    booking = get_object_or_404(Booking, id=booking_id)
    
    payment_status = request.data.get('payment_status')
    if payment_status not in ['paid', 'unpaid']:
        return Response(
            {'error': 'Invalid payment status. Must be "paid" or "unpaid"'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    booking.payment_status = payment_status
    booking.save()
    
    serializer = BookingSerializer(booking)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_mechanic(request, booking_id):
    """
    Assign mechanic to booking (admin only)
    """
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can assign mechanics'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    booking = get_object_or_404(Booking, id=booking_id)
    
    mechanic_id = request.data.get('mechanic_id')
    if not mechanic_id:
        return Response(
            {'error': 'Mechanic ID is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    from .models import User
    mechanic = get_object_or_404(User, id=mechanic_id)
    
    if mechanic.role != 'mechanic':
        return Response(
            {'error': 'User must be a mechanic'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    booking.mechanic = mechanic
    booking.save()
    
    serializer = BookingSerializer(booking)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mechanic_bookings(request):
    """
    Get bookings assigned to logged-in mechanic
    """
    if request.user.role != 'mechanic':
        return Response(
            {'error': 'Only mechanics can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    bookings = Booking.objects.filter(mechanic=request.user)
    
    # Filtering
    status_filter = request.query_params.get('status', None)
    if status_filter:
        bookings = bookings.filter(status=status_filter)
    
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def available_time_slots(request):
    """
    Get available time slots for a specific date
    """
    booking_date = request.query_params.get('date')
    
    if not booking_date:
        return Response(
            {'error': 'Date parameter is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Get all booked time slots for the date
    booked_slots = Booking.objects.filter(
        booking_date=booking_date
    ).exclude(
        status='cancelled'
    ).values_list('time_slot', flat=True)
    
    # Define available time slots (9 AM to 5 PM)
    all_slots = [
        '09:00:00', '10:00:00', '11:00:00', '12:00:00',
        '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00'
    ]
    
    available_slots = [slot for slot in all_slots if slot not in [str(s) for s in booked_slots]]
    
    return Response({
        'date': booking_date,
        'available_slots': available_slots,
        'booked_slots': [str(s) for s in booked_slots]
    })
