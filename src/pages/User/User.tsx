import React, { useEffect, useState } from 'react'

import { QRcode } from '../../components/atom/QRcode/QRcode'
import { startFCM } from '../../config/firebase'
import { request } from '../../helpers/request'
import { readSessionStorage } from '../../helpers/sessionStorage'
import { Strategy } from '../../interfaces/Strategy'
import { User } from '../../interfaces/user'

export function UserPage(): JSX.Element {
  const [qrcodeUrl, setQrcodeUrl] = useState('')

  useEffect(() => {
    startFCM()
      .then((dvc) => setDeviceId(dvc))
      .catch((e) => console.error(e))
  })

  const setDeviceId = async (dvc: string) => {
    const user = readSessionStorage<User>('user')
    if (!user) throw new Error('shoudl exist an user')
    ;(await request.patch)<{ mfaId: string }>('/user', {
      userId: user.id,
      strategy: Strategy.GA,
    })
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
      <p>USER</p>
      <button onClick={createGA}>Criar GA</button>
      {qrcodeUrl && <QRcode url={qrcodeUrl} />}
    </>
  )
}
