"""
User Management Controller
Handles admin operations for managing customers and mechanics
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.models import User
from api.serializers import UserSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users_by_role(request, role):
    """
    Get all users by role (customer or mechanic)
    Only admins can access this
    """
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    if role not in ['customer', 'mechanic']:
        return Response(
            {'error': 'Invalid role. Must be customer or mechanic'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    users = User.objects.filter(role=role)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toggle_user_active(request, user_id):
    """
    Activate or deactivate a user (customer or mechanic)
    Only admins can access this
    """
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if user.role == 'admin':
        return Response(
            {'error': 'Cannot modify admin users'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    user.is_active = not user.is_active
    user.save()
    
    return Response({
        'message': f'User {"activated" if user.is_active else "deactivated"} successfully',
        'user': UserSerializer(user).data
    })


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    """
    Delete a user (customer or mechanic)
    Only admins can access this
    """
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if user.role == 'admin':
        return Response(
            {'error': 'Cannot delete admin users'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    email = user.email
    user.delete()
    
    return Response({
        'message': f'User {email} deleted successfully'
    })
