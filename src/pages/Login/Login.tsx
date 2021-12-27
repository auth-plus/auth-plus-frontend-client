import { TextField } from '@mui/material'
import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/molecules/Button/Button'
import { AppAuthContext } from '../App'
import styles from './Login.module.scss'
interface stateType {
  from: { pathname: string }
}

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as stateType)?.from?.pathname || '/'

  const [error, setError] = useState<Error | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = useContext(AppAuthContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      auth.signIn(email, password, () => navigate(from, { replace: true }))
    } catch (error) {
      setError(error as Error)
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
        </form>
        <div className={styles.error}>{error?.message}</div>
      </div>
    </main>
  )
}

export default Login
