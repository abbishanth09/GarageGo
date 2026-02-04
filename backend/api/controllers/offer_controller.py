from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from api.models.offer_model import Offer
from api.serializers import OfferSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def offer_list_create(request):
    """Admin: List all offers or create new offer"""
    if not (hasattr(request.user, 'role') and request.user.role == 'admin'):
        return Response({'error': 'Only admins can manage offers'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        offers = Offer.objects.all()
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = OfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def offer_detail(request, pk):
    """Admin: Get, update or delete a specific offer"""
    if not (hasattr(request.user, 'role') and request.user.role == 'admin'):
        return Response({'error': 'Only admins can manage offers'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        offer = Offer.objects.get(pk=pk)
    except Offer.DoesNotExist:
        return Response({'error': 'Offer not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = OfferSerializer(offer)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = OfferSerializer(offer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        offer.delete()
        return Response({'message': 'Offer deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def offer_list_all(request):
    """Get all active offers (for customers)"""
    now = timezone.now()
    offers = Offer.objects.filter(
        is_active=True,
        valid_from__lte=now,
        valid_until__gte=now
    )
    serializer = OfferSerializer(offers, many=True)
    return Response(serializer.data)
