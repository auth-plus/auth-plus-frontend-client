import { toDataURL } from 'qrcode'
import React, { useState, useEffect } from 'react'

interface QRcodeProps {
  url: string
}

export const QRcode: React.FunctionComponent<QRcodeProps> = (
  props: QRcodeProps
) => {
  const [data, setData] = useState('')
  useEffect(() => {
    const getQrCodeImage = async () => {
      const data = await toDataURL(props.url)
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
