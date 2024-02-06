import json
from asgiref.sync import async_to_sync
import asyncio
import threading
from utils.align import blast_align, align_sequence_to_lib
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from django.core.exceptions import ValidationError
# from channels.db import database_sync_to_async
from .models import SequenceAlignmentResult
from django.core.cache import cache

from payload.msg import align_msg

import logging
logger = logging.getLogger(__name__)

class AlignmentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope.get("user")
        logger.info(f"User {user.username} connected.")
        if user and user.is_authenticated:
            await self.accept()
            # Retrieve data from the database asynchronously
            results = SequenceAlignmentResult.objects.filter(user_id=user.id)
            # Send the data to the user
            # logger.info(results)
            msg = [align_msg(res.query_number, res.sequence, res.timestamp.isoformat(), res.alignments) for res in results]
            await self.send(json.dumps(msg))
        else:
            await self.close()

    async def receive(self, text_data):
        data = json.loads(text_data)
        logger.info(data)
        timestamp = data.get('timestamp')
        query_number = data.get('query_number')
        sequence = data.get('sequence')

        # Validate input
        if not query_number or not sequence:
            await self.send_error("Invalid input")
            return
        # Insert into the database
        alignment_result = SequenceAlignmentResult(query_number=query_number, sequence=sequence, timestamp = timestamp, alignments=None, user_id_id=self.scope.get("user").id)
        alignment_result.save()
        # Create a task and start it asynchronously
        asyncio.ensure_future(self.run_task(query_number, timestamp ,sequence))

    async def run_task(self, query_number, timestamp, sequence):
        # see if sequence is in cache
        alignments = cache.get(sequence)
        if alignments is None:
            logger.info("Cache miss!")
            # start align if cache miss
            # asyncio.sleep(5)
            # alignments = ['res1', 'res2']
            # alignments = blast_align(sequence)
            try:
                alignments = align_sequence_to_lib(sequence)
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
            cache.set(sequence, alignments, timeout=3600)
        else:
            logger.info("Cache hit!")
        # Insert into the database
        SequenceAlignmentResult.objects.filter(query_number=query_number).update(alignments=alignments)

        # Task completed; send the result to the frontend
        result_message = json.dumps(align_msg(query_number, sequence, timestamp, alignments))
        
        logger.info(result_message)
        await self.send(result_message)

    async def send_error(self, error_message):
        # Send an error message to the frontend
        await self.send(text_data=json.dumps({
            'error_message': error_message,
        }))

    
