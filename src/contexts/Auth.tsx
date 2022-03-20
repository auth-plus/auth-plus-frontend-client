import React, { useState, createContext } from 'react'

import { request } from '../helpers/request'
import {
  readSessionStorage,
  writeSessionStorage,
} from '../helpers/sessionStorage'
import { Credential } from '../interfaces/Credential'
import { MFAChoose } from '../interfaces/MFAChoose'
import { Strategy } from '../interfaces/Strategy'
import { User } from '../interfaces/user'

interface AuthCtxt {
  user: User | null
  signIn: (
    email: string,
    password: string,
    callback: VoidFunction
  ) => Promise<void | MFAChoose>
  signOut: () => Promise<void>
  chooseMfa: (hash: string, strategy: Strategy) => Promise<string>
  mfaCode: (hash: string, code: string, callback: VoidFunction) => Promise<void>
}

export const AuthContext = createContext<AuthCtxt>(null!)

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
      return resp as MFAChoose
    }
  }

  const signOut = async () => {
    writeSessionStorage(null, 'user')
    writeSessionStorage(null, 'jwt')
    setUser(null)
  }

  const chooseMfa = async (hash: string, strategy: Strategy) => {
    const resp = await request.post<{ hash: string }>('/mfa/choose', {
      hash,
      strategy,
    })
    return resp.hash
  }

  const mfaCode = async (
    hash: string,
    code: string,
    callback: VoidFunction
  ) => {
    const resp = await request.post<Credential>('/mfa/code', {
      hash,
      code,
    })
    setUser({ id: resp.id })
    writeSessionStorage<User>({ id: resp.id }, 'user')
    writeSessionStorage(resp.token, 'jwt')
    callback()
  }

  const initState: AuthCtxt = {
    user,
    signIn,
    signOut,
    chooseMfa,
    mfaCode,
  }

  return (
    <AuthContext.Provider value={initState}>
      {props.children}
    </AuthContext.Provider>
  )
}
