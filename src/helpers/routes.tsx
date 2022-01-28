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

interface PageContent {
  name: string
  url: string
  element: JSX.Element
}

export enum PageEnum {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  USER = 'USER',
}

export const PagesObject: Record<PageEnum, PageContent> = {
  LOGIN: {
    name: 'Login',
    url: '/login',
    element: <Login />,
  },
  HOME: {
    name: 'Home',
    url: '/',
    element: <Home />,
  },
  USER: {
    name: 'User',
    url: '/user',
    element: <UserPage />,
  },
}

export const routes: RouteObject[] = [
  {
    path: PagesObject.LOGIN.name,
    element: PagesObject.LOGIN.element,
  },
  {
    path: PagesObject.HOME.url,
    element: (
      <RequireAuth>
        <Layout>
          <Outlet />
        </Layout>
      </RequireAuth>
    ),
    children: [
      { index: true, element: PagesObject.HOME.element },
      { path: PagesObject.USER.url, element: PagesObject.USER.element },
    ],
  },
]
