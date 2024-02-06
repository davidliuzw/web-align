from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path, re_path
from .consumers import AlignmentConsumer

websocket_urlpatterns = [
    # Add other WebSocket paths and consumers as needed
    path("ws/align-sequences-sockets/", AlignmentConsumer.as_asgi()),
]