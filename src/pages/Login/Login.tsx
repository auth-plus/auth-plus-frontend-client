import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppAuthContext } from '../App'

interface stateType {
  from: { pathname: string }
}

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as stateType)?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = useContext(AppAuthContext)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    auth.signin(email, password, () => navigate(from, { replace: true }))
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <label htmlFor="fname">First name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="lname">Last name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Entrar" />
      </form>
    </div>
  )
}

export default Login
