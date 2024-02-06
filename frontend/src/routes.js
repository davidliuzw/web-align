import React from 'react'

// show case lazy loading
const Align = React.lazy(() => import('./views/align/AlignWithLongPolling'))
const AlignWithSockets = React.lazy(() => import('./views/align/AlignWithSockets'))
const Profile = React.lazy(() => import('./views/pages/Profile'))
const Home = React.lazy(() => import('./views/pages/Home'))
const AlignResultDetail = React.lazy(() => import('./views/align/AlignResultDetail'))

const routes = [
  { path: '/', exact: true, element: Home },
  { path: '/align', name: 'Align', element: Align },
  { path: '/alignSockets', name: 'Align with Sockets', element: AlignWithSockets },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/result_detail/:query_number', name: 'Align Result Detail', element: AlignResultDetail },
]

export default routes
