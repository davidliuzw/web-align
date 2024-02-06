release: cd backend && python manage.py migratepython manage.py migrate
web: cd backend && daphne mysite.asgi:application -u /tmp/daphne.sock --bind 0.0.0.0 --port 8000
