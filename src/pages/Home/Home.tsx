import React, { useEffect, useState } from 'react'
import QRcode from '../../components/molecules/QRcode/QRcode'
import { startFCM } from '../../config/firebase'
import { request } from '../../helpers/request'
import { readSessionStorage } from '../../helpers/sessionStorage'
import { Strategy } from '../../interfaces/Strategy'
import { User } from '../../interfaces/user'

export const Home: React.FunctionComponent = () => {
  const [qrcodeUrl, setQrcodeUrl] = useState('')
  const [deviceId, setDeviceId] = useState('')

  useEffect(() => {
    startFCM()
      .then((dvc) => setDeviceId(dvc))
      .catch((e) => console.error(e))
  })

  const sendPN = async () => {
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    const config: RequestInit = {
      method: 'POST',
      headers: requestHeaders,

      body: JSON.stringify({
        title: 'Title test',
        deviceId: deviceId,
        content: 'Content test',
      }),
    }

    await fetch('http://localhost:5001/push_notification', config)
  }

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
      {deviceId}
      <button onClick={sendPN}>Send PN</button>
    </>
  )
}

export default Home
