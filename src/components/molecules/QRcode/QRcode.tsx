import React, { useState, useEffect } from 'react'
import qrcode from 'qrcode'

interface QRcodeProps {
  url:string
}

export const QRcode: React.FunctionComponent<QRcodeProps> = (props:QRcodeProps) => {
  const [data, setData] = useState('')
  useEffect(() => {
    const getQrCodeImage = async () => {
      const data = await qrcode.toDataURL(props.url)
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
