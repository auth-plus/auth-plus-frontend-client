import Home from '../pages/Home/Home'

import { Navigate, Outlet, RouteObject, useLocation } from 'react-router-dom'
import React from 'react'
import { AuthContext } from '../contexts/Auth'
import Login from '../pages/Login/Login'
import Layout from '../components/molecules/Layout'
import UserPage from '../pages/User/User'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = React.useContext(AuthContext)
  const location = useLocation()
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return children
}

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout>
          <Outlet />
        </Layout>
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: '/user', element: <UserPage /> },
    ],
  },
]
