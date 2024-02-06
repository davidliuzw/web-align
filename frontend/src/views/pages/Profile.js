import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'

const Profile = () => {
  const token = localStorage.getItem('token')
  const [userData, setUserData] = useState({})
  const apiUrl = 'http://127.0.0.1:8000/api/profile'

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })

        if (response.ok) {
          const profileData = await response.json()
          setUserData(profileData)
        } else {
          console.error('Error fetching profile data:', response.status)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    // Fetch profile data when the component mounts
    fetchProfileData()
  }, [apiUrl, token])

  return (
    <CCard className="text-center">
      <CCardHeader>Profile</CCardHeader>
      <CCardBody>
        <CCardTitle>{userData.username}</CCardTitle>
        <CCardText>{userData.email}</CCardText>
        <CButton href="#/align">See past results</CButton>
      </CCardBody>
    </CCard>
  )
}
export default Profile
