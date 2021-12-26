import React, { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from '../components/atom/Layout'
import { readSessionStorage, writeSessionStorage } from '../helpers/sessionStorage'
import { User } from '../interfaces/user'

import Home from './Home/Home'
import Login from './Login/Login'

interface AppCtxt {
  user: User | null
  signIn: (email: string, password: string, callback: VoidFunction) => void
  signOut: () => void
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
  const initUSerState = readSessionStorage<User>("user")
  const [user, setUser] = useState<User | null>(initUSerState)
  const signIn = (email: string, password: string, callback: VoidFunction) => {
    if (email === 'a' && password === 'a') {
      setUser({ id: 'user_id_hash' })
      writeSessionStorage<User>({ id: 'user_id_hash' }, 'user')
    }
    callback()
  }

  const signOut = () => {
    writeSessionStorage(null, 'user')
    setUser(null)
  }
  const initState: AppCtxt = { user, signIn, signOut }
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
