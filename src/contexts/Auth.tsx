import React, { useState } from 'react'
import { request } from '../helpers/request'
import {
  readSessionStorage,
  writeSessionStorage,
} from '../helpers/sessionStorage'
import { Credential } from '../interfaces/Credential'
import { MFAChoose } from '../interfaces/MFAChoose'
import { User } from '../interfaces/user'

interface AuthCtxt {
  user: User | null
  signIn: (
    email: string,
    password: string,
    callback: VoidFunction
  ) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = React.createContext<AuthCtxt>(null!)

export const AuthContextCmpnt: React.FunctionComponent = (props) => {
  const initUSerState = readSessionStorage<User>('user')
  const [user, setUser] = useState<User | null>(initUSerState)

  const signIn = async (
    email: string,
    password: string,
    callback: VoidFunction
  ) => {
    const resp = await request.post<Credential | MFAChoose>('/login', {
      email,
      password,
    })
    if ('id' in resp) {
      setUser({ id: resp.id })
      writeSessionStorage<User>({ id: resp.id }, 'user')
      writeSessionStorage(resp.token, 'jwt')
      callback()
    } else {

    }
  }

  const signOut = async () => {
    writeSessionStorage(null, 'user')
    writeSessionStorage(null, 'jwt')
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
