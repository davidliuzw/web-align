export const alignPayload = (query_number, sequence, timestamp, alignments, message) => {
  return {
    query_number: query_number,
    sequence: sequence,
    timestamp: timestamp,
    alignments: alignments,
    message: message,
  }
}

export const align_finished = 'See Details!'
export const task_in_progress = 'Task in progress...'
