import { TextField } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '../../components/atom/Button/Button'
import { AuthContext } from '../../contexts/Auth'
import { SnackbarContext } from '../../contexts/Snackbar'
import { MFAChoose } from '../../interfaces/MFAChoose'

import styles from './Login.module.scss'
import { MfaModal } from './MfaModal'
export interface stateType {
  from: { pathname: string }
}

export function Login(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as stateType)?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mfaChoose, setMfaChoose] = useState<MFAChoose | null>(null)

  const auth = useContext(AuthContext)
  const snackbar = useContext(SnackbarContext)

  useEffect(() => {
    if (auth.user) {
      navigate(from)
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const resp = await auth.signIn(email, password, () => navigate(from))
      if (resp) {
        setMfaChoose(resp)
      }
    } catch (error) {
      snackbar.error(error as Error)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.side}></div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign In</Button>
          {mfaChoose && (
            <MfaModal mfaChoose={mfaChoose} navigate={navigate} from={from} />
          )}
        </form>
      </div>
    </main>
  )
}
