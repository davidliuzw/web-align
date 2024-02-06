from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from ..models import SequenceAlignmentResult 

import logging
logger = logging.getLogger(__name__)
class ResultDetailView(View):
    def get(self, request, query_number, *args, **kwargs):
        # Retrieve the object based on the query_number
        logger.info("Request for detail received!")
        result = get_object_or_404(SequenceAlignmentResult, query_number=query_number)

        # You can customize the data you want to return in the JsonResponse
        data = {
            'query_number': result.query_number,
            'sequence': result.sequence,
            'timestamp': result.timestamp.isoformat(),
            'alignments': result.alignments,
            # Add more fields as needed
        }

        return JsonResponse(data)
