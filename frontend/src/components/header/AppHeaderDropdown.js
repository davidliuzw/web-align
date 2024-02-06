import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilSettings, cilAccountLogout, cilPeople, cilUser, cilUserFollow } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AppHeaderDropdown = () => {
  const token = localStorage.getItem('token')
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.setItem('username', 'Profile')
    window.location.reload()
  }
  const username = localStorage.getItem('username')
  const firstLetter = username ? username.charAt(0).toUpperCase() : 'P'
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar color="primary" textColor="white" size="lg">
          {firstLetter}
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        {token ? (
          // If token is present, render "Profile" and "Logout"
          <>
            <CDropdownItem href="/#/profile">
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
            <CDropdownItem onClick={handleLogout}>
              <CIcon icon={cilAccountLogout} className="me-2" />
              Logout
            </CDropdownItem>
          </>
        ) : (
          // If token is not present, render "Sign In" and "Register"
          <>
            <CDropdownItem href="/#/login">
              <CIcon icon={cilUser} className="me-2" />
              Sign In
            </CDropdownItem>
            <CDropdownItem href="/#/register">
              <CIcon icon={cilUserFollow} className="me-2" />
              Register
            </CDropdownItem>
          </>
        )}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
