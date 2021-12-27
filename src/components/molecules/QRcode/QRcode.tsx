import React, { useState, useEffect } from 'react'
import qrcode from 'qrcode'

export const QRcode: React.FunctionComponent = () => {
  const [data, setData] = useState('')
  useEffect(() => {
    const url =
      'otpauth://totp/auth-plus-main:admin%40authplus.com?secret=PJSCOQZ4KVYUQ33Q&period=30&digits=6&algorithm=SHA1&issuer=auth-plus-main'
    const getQrCodeImage = async () => {
      const data = await qrcode.toDataURL(url)
      setData(data)
    }
    getQrCodeImage()
  })
  return (
    <div>
      <img src={data} alt="qrcode" />
    </div>
  )
}

export default QRcode
