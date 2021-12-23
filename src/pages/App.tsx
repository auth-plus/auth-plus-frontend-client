import React, { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from '../components/atom/Layout'

import Home from './Home/Home'
import Login from './Login/Login'

interface User {
  id: string
}

interface AppCtxt {
  user: User | null
  signin: (email: string, password: string, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

export const AppAuthContext = React.createContext<AppCtxt>(null!)

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = React.useContext(AppAuthContext)
  let location = useLocation()
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return children
}

export const App: React.FunctionComponent = () => {
  const [user, setUser] = useState<User | null>(null)
  let signin = (email: string, password: string, callback: VoidFunction) => {
    if (email === 'a' && password === 'a') {
      setUser({ id: 'user_id_hash' })
    }
    callback()
  }

  let signout = (callback: VoidFunction) => {
    setUser(null)
    callback()
  }
  const initState: AppCtxt = { user, signin, signout }
  return (
    <AppAuthContext.Provider value={initState}>
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
    </AppAuthContext.Provider>
  )
}

export default App
