from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class LoginViewTestCase(TestCase):
    def setUp(self):
        # Create a test user
        self.username = 'test_user'
        self.password = 'test_password'
        self.user = User.objects.create_user(username=self.username, password=self.password)

        # Initialize the APIClient
        self.client = APIClient()

    def test_login_view(self):
        # Define the URL for the LoginView
        url = reverse('login')

        # Prepare data for the POST request
        data = {
            'username': self.username,
            'password': self.password
        }

        # Make a POST request to the LoginView
        response = self.client.post(url, data, format='json')

        # Check if the response status code is 202 (Accepted)
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

        # Check if the response contains the token, username, and user_id
        self.assertIn('token', response.data)
        self.assertIn('username', response.data)
        self.assertIn('user_id', response.data)

class ProfileViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create a user
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        # Create a token for the user
        self.token = Token.objects.create(user=self.user)

    def test_profile_view(self):
        # Set the token in the request header
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        # Send a GET request to the profile endpoint
        response = self.client.get('/profile/')
        # Check if the response status code is 200
        self.assertEqual(response.status_code, 200)
        # Check if the response contains the user's profile data
        self.assertEqual(response.data['username'], 'testuser')
        # Optionally, you can test other attributes of the user's profile