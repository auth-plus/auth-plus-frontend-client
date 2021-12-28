import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from '../components/atom/Layout'
import AuthContextCmpnt, { AuthContext } from '../contexts/Auth'
import SnackbarContextCmpnt from '../contexts/Snackbar'
import Home from './Home/Home'
import Login from './Login/Login'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = React.useContext(AuthContext)
  let location = useLocation()
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return children
}

export const App: React.FunctionComponent = () => {
  return (
    <AuthContextCmpnt>
      <SnackbarContextCmpnt>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout>
                  <Home />
                </Layout>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SnackbarContextCmpnt>
    </AuthContextCmpnt>
  )
}

export default App
