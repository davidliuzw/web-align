from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
import logging
import threading
import time
from channels.db import database_sync_to_async
from utils.align import blast_align
from payload.msg import align_msg
# auth
from .. import serializers
from rest_framework import views
from django.contrib.auth import login, logout
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async

logger = logging.getLogger(__name__)

class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = []
    authentication_classes = [TokenAuthentication]

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data,
            context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)

        # Generate or retrieve the token for the authenticated user
        token, created = Token.objects.get_or_create(user=user)

        # Include the token in the response payload
        response_data = {
            'token': token.key,
            'username': user.username,
            'user_id': user.id,  # You can include other user-related information if needed
        }
        logger.info(response_data)
        return Response(response_data, status=status.HTTP_202_ACCEPTED)