from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User 

# Create your models here.
class SequenceAlignmentResult(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    query_number = models.CharField(max_length=16, default='some_default_value', primary_key=True)
    sequence = models.CharField(max_length=200)
    timestamp = models.DateTimeField()
    alignments = models.CharField(max_length = 1000, null=True, blank=True)
