import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const AlignResultDetail = () => {
  const [resultData, setResultData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { query_number } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      console.log('start fetching data')
      console.log(query_number)
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}api/result_detail/${query_number}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        setResultData(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching result detail:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query_number])

  return (
    <div>
      <a href="#" onClick={() => window.history.back()}>
        Go back to previous page
      </a>
      {loading && <p>Loading...</p>}
      {resultData && (
        <div>
          <h3>Result Detail</h3>
          <p>Query Number: {resultData.query_number}</p>
          <p>Sequence: {resultData.sequence}</p>
          <p>Timestamp: {resultData.timestamp}</p>
          <p>Alignments: {resultData.alignments}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  )
}

export default AlignResultDetail
