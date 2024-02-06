import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAlignCenter, cilUser } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Alignment',
    icon: <CIcon icon={cilAlignCenter} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Align with Long Polling',
        to: '/align',
      },
      {
        component: CNavItem,
        name: 'Align with Sockets',
        to: '/alignSockets',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'User',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Profile',
        to: '/profile',
      },
    ],
  },
]

export default _nav
