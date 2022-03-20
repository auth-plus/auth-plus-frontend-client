import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyCiPvMANIaBkNJOB2YR1CvSDZ0HZUIkGsk',
  authDomain: 'ifood2-63802.firebaseapp.com',
  projectId: 'ifood2-63802',
  storageBucket: 'ifood2-63802.appspot.com',
  messagingSenderId: '361844031064',
  appId: '1:361844031064:web:c850617ed0bf4facb9d42d',
  measurementId: 'G-3NMKK0MNEC',
}

export const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

export const startFCM = async () => {
  return await getToken(messaging, {
    vapidKey:
      'BGLR0T2dDTOhWY177RU4hTlIvQlfiPE2CW3DX8EhaDeKxNvNt3_I49oMvauEoX74bOcfj5iLDqoPH4EPUHbCAjY',
  })
}
