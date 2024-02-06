import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { getCurrentDateTime, parseResponseTime } from '../../utils/timeUtils'
import { alignPayload, task_in_progress } from '../../payload/alignPayload'

const AlignWithSockets = () => {
  const [isFormValid, setIsFormValid] = useState(true)
  const [sequence, setSequence] = useState('')
  const [responses, setResponses] = useState([])

  const token = localStorage.getItem('token')
  // const socketUrl = 'ws://127.0.0.1:8000/ws/align-sequences-sockets/?token=' + token
  const socketUrl = `${process.env.REACT_APP_API_URL.replace(
    /^http/,
    'ws',
  )}/ws/align-sequences-sockets/?token=${token}`
  const alignmentSocket = new WebSocket(socketUrl)
  const [socket, setSocket] = useState(alignmentSocket)
  const apiUrl = `${process.env.REACT_APP_API_URL}/api/align-sequences/`
  // const apiUrl = 'http://127.0.0.1:8000/api/align-sequences/'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })
        if (response.ok) {
          const historyData = await response.json()
          setResponses((prevResponses) => [...historyData])
        } else {
          console.error('Error fetching history data:', response.status)
        }
      } catch (error) {
        console.error('Error fetching history data:', error)
      }
    }

    // Fetch data initially
    fetchData()

    // ComponentDidMount - Connect to WebSocket when component mounts
    setSocket(alignmentSocket)
    alignmentSocket.onopen = function (event) {
      console.log('Socket open, listening...', event)
    }
    alignmentSocket.onclose = function (event) {
      console.log('Socket closed:', event)
    }
    alignmentSocket.onerror = function (error) {
      console.error('WebSocket error:', error)
    }

    // ComponentWillUnmount - Close WebSocket when component unmounts
    return () => {
      alignmentSocket.close()
    }
  }, [apiUrl, token])

  const handleTextareaChange = (event) => {
    const value = event.target.value
    setSequence(value)
    setIsFormValid(value.trim() !== '')
  }
  // handle incoming messages
  socket.onmessage = function (e) {
    // Handle incoming message
    const responseData = JSON.parse(e.data)
    // find the correct response to update
    const existingResponseIndex = responses.findIndex(
      (response) => response.query_number === responseData.query_number,
    )
    console.log(responseData)
    console.log(responses)
    console.log(existingResponseIndex)
    // TODO handle the error later
    if (existingResponseIndex !== -1) {
      // If exists, update the response at that index
      setResponses((prevResponses) => {
        const updatedResponses = [...prevResponses]
        updatedResponses[existingResponseIndex] = responseData
        return updatedResponses
      })
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const query_number = uuidv4()
    const timestamp = getCurrentDateTime()

    try {
      // send request to server via socket
      socket.send(JSON.stringify(alignPayload(query_number, sequence, timestamp)))
      // save newRequest to responses for temporary showcase
      const newRequest = alignPayload(query_number, sequence, timestamp, null, task_in_progress)
      console.log(newRequest)
      setResponses((prevResponses) => prevResponses.concat(newRequest))
      // set the input box to empty after submission
      setSequence('')
      console.log(responses)
    } catch (error) {
      console.error('Error submitting sequence:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sequence Alignment</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Please input the sequence in the text box to start alignment:
            </p>
            <CForm onSubmit={handleSubmit} validated={!isFormValid}>
              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  Sequence
                </CFormLabel>
                <CFormTextarea
                  id="validationTextarea"
                  placeholder="Input Required"
                  invalid={!isFormValid}
                  required
                  onChange={handleTextareaChange}
                  value={sequence}
                ></CFormTextarea>
                <CFormFeedback invalid>Please enter a seqeunce in the textarea.</CFormFeedback>
              </div>

              <div className="mb-3">
                <CButton type="submit" color="primary" disabled={!isFormValid}>
                  Submit
                </CButton>
              </div>
            </CForm>
            <CCardHeader>
              <strong>Results</strong>
            </CCardHeader>
            {token ? (
              // Render the table if token is present
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sequence</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Time of Submission</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {responses.map((response, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{response.sequence.substring(0, 10)}</CTableDataCell>
                      <CTableDataCell>{parseResponseTime(response.timestamp)}</CTableDataCell>
                      <CTableDataCell>
                        {response.alignments ? (
                          <a href={`/#/result_detail/${response.query_number}`}>
                            Task finished! Click to see details
                          </a>
                        ) : (
                          <span>Task in progress...</span>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              // Render sign-in message if token is not present
              <div>
                <p>Please sign in to see results.</p>
                {/* Add your sign-in component or link here */}
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AlignWithSockets
