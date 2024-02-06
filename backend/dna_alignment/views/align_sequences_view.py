from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.core.cache import cache
import threading
from ..models import SequenceAlignmentResult
from utils.align import blast_align, align_sequence_to_lib
from payload.msg import align_msg
from rest_framework import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import datetime
import json
import logging
logger = logging.getLogger(__name__)

import time

class AlignSequencesView(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # retrieve user input
        user_input_seq = request.data.get('sequence', '')
        query_num = request.data.get('query_number', '')
        timestamp = request.data.get('timestamp')

        logger.info("User input sequence: " + user_input_seq)
        logger.info("Alignment starts!")

        thread = threading.Thread(target=align, args=(user_input_seq, query_num,))
        thread.start()

        # Insert into the database
        alignment_result = SequenceAlignmentResult(query_number=query_num, sequence=user_input_seq, timestamp = timestamp, alignments=None, user_id_id=request.user.id)
        alignment_result.save()

        align_message = align_msg(query_num, user_input_seq, timestamp, None)
        return Response(align_message, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        logger.info(request.user.id)
        results = SequenceAlignmentResult.objects.filter(user_id=request.user.id)
        # logger.info(results)
        msg = [align_msg(res.query_number, res.sequence, res.timestamp.isoformat(), res.alignments) for res in results]
        # logger.info(msg)
        return JsonResponse(msg, status=status.HTTP_200_OK, safe=False)

def align(seq, query_num):
    alignments = cache.get(seq)
    if alignments is None:
        logger.info("Cache miss!")
        # start align if cache miss
        try:
            alignments = align_sequence_to_lib(seq)
        except Exception as e:
            # Handle the exception here
            logger.info(f"An error occurred: {e}")
            error_info = {
                "error_type": type(e).__name__,
                "error_message": str(e)
            }
            # Serialize the error_info dictionary to JSON
            json_error = json.dumps(error_info)
            alignments = json_error
        # alignments = align_sequence_to_lib(seq)
        cache.set(seq, alignments, timeout=3600)
    else:
        logger.info("Cache hit!")
    SequenceAlignmentResult.objects.filter(query_number=query_num).update(alignments=alignments)
    return alignments