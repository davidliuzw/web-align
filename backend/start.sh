# Start Gunicorn for HTTP on port 8000
gunicorn mysite.wsgi:application --bind 0.0.0.0:8000 &
daphne -u /tmp/daphne.sock mysite.asgi:application --bind 0.0.0.0 --port 8001