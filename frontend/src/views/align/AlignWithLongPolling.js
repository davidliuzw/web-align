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
// import axios from 'axios'

const Align = () => {
  const [sequence, setSequence] = useState('')
  const [isFormValid, setIsFormValid] = useState(true)
  const [responses, setResponses] = useState([])
  const apiUrl = 'http://127.0.0.1:8000/api/align-sequences/'
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(apiUrl)
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
    // Set up an interval to fetch data every 20 seconds
    const intervalId = setInterval(fetchData, 5000)
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [token])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const query_number = uuidv4()
    const timestamp = getCurrentDateTime()
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(alignPayload(query_number, sequence, timestamp)),
      })
      // save newRequest to responses for temporary showcase
      const newRequest = alignPayload(query_number, sequence, timestamp, null, task_in_progress)
      setResponses((prevResponses) => prevResponses.concat(newRequest))
      if (response.ok) {
        setSequence('')
        console.log('Sequence submitted successfully')
      } else {
        console.error('Failed to submit sequence')
      }
    } catch (error) {
      console.error('Error submitting sequence:', error)
    }
  }

  const handleTextareaChange = (event) => {
    const value = event.target.value
    setSequence(value)
    setIsFormValid(value.trim() !== '')
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

export default Align
