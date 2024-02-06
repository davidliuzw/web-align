import json
import copy
align_msg_template = {
    'query_number':'',
    'sequence':'',
    'timestamp':'',
    'alignments':'',
    'message':'',
}
align_finished = "See Details!"
task_in_progress = "Task in progress..."

def align_msg(query_number, sequence, timestamp, alignments):
    msg = copy.copy(align_msg_template)

    msg['query_number'] = query_number
    msg['sequence'] = sequence
    msg['timestamp'] = timestamp
    msg['alignments'] = alignments

    if alignments == None:
        msg['message'] = task_in_progress
    else:
        msg['message'] = align_finished
    
    # json_payload = json.dumps(msg)

    # return json_payload
    return msg
