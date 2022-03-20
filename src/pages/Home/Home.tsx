import React, { useEffect } from 'react'

import { startFCM } from '../../config/firebase'
import { request } from '../../helpers/request'
import { readSessionStorage } from '../../helpers/sessionStorage'
import { Strategy } from '../../interfaces/Strategy'
import { User } from '../../interfaces/user'

export function Home(): JSX.Element {
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

  return (
    <>
      <p>HOME</p>
    </>
  )
}
