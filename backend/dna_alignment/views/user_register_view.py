from rest_framework.response import Response
from rest_framework import status
import logging
from utils.align import blast_align
from payload.msg import align_msg
# auth
from .. import serializers
from rest_framework import views
from django.contrib.auth import login

logger = logging.getLogger(__name__)

class UserRegisterView(views.APIView):
    """
    API View for user registration.
    """
    permission_classes = []
    def post(self, request, *args, **kwargs):
        serializer = serializers.RegistrationSerializer(data=request.data)
        logger.info(serializer)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response({'message': 'User registered and logged in successfully'}, status=status.HTTP_201_CREATED)
        else:
            print("Validation Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
