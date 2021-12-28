import React, { useState } from 'react'
import {
  readSessionStorage,
  writeSessionStorage,
} from '../helpers/sessionStorage'
import { User } from '../interfaces/user'

interface AuthCtxt {
  user: User | null
  signIn: (email: string, password: string, callback: VoidFunction) => void
  signOut: () => void
}

export const AuthContext = React.createContext<AuthCtxt>(null!)

export const AuthContextCmpnt: React.FunctionComponent = (props) => {
  const initUSerState = readSessionStorage<User>('user')
  const [user, setUser] = useState<User | null>(initUSerState)
  const signIn = (email: string, password: string, callback: VoidFunction) => {
    if (email === 'a' && password === 'a') {
      setUser({ id: 'user_id_hash' })
      writeSessionStorage<User>({ id: 'user_id_hash' }, 'user')
      callback()
    }
    throw new Error('wrong credential')
  }

  const signOut = () => {
    writeSessionStorage(null, 'user')
    setUser(null)
  }
  const initState: AuthCtxt = {
    user,
    signIn,
    signOut,
  }
  return (
    <AuthContext.Provider value={initState}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextCmpnt
