import React, { useState } from 'react'
import QRcode from '../../components/molecules/QRcode/QRcode'
import { request } from '../../helpers/request'
import { readSessionStorage } from '../../helpers/sessionStorage'
import { Strategy } from '../../interfaces/Strategy'
import { User } from '../../interfaces/user'

export const Home: React.FunctionComponent = () => {
  const [qrcodeUrl, setQrcodeUrl] = useState('')
  const createGA = async () => {
    const user = readSessionStorage<User>('user')
    if (!user) throw new Error('shoudl exist an user')

    const resp = await request.post<{ mfaId: string }>('/mfa', {
      userId: user.id,
      strategy: Strategy.GA,
    })
    setQrcodeUrl(resp.mfaId)
  }
  return (
    <>
      <p>HOME</p>
      <button onClick={createGA}>Criar GA</button>
      {qrcodeUrl && <QRcode url={qrcodeUrl} />}
    </>
  )
}

export default Home
