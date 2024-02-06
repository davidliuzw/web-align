# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app/backend

# Copy the current directory contents into the container
COPY . /app/backend

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the necessary ports
EXPOSE 8000

# WORKDIR /app/backend/mysite
# Define environment variable
ENV DJANGO_SETTINGS_MODULE=mysite.settings
# Run migrations
RUN python manage.py makemigrations
RUN python manage.py migrate
# Run Gunicorn for HTTP on port 8000
# Run Daphne for WebSocket on port 8001
# CMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000"]
# CMD ["daphne", "-u", "mysite.mysite.asgi:application", "--bind", "0.0.0.0", "--port", "8000"]
CMD ["daphne", "mysite.asgi:application", "-u", "/tmp/daphne.sock", "--bind", "0.0.0.0", "--port", "8000"]
