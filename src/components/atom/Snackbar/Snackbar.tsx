import React, { useEffect, useState } from 'react'

import styles from './Snackbar.module.scss'

interface SnackbarProps {
  open?: boolean
  type?: string
  content: string
  time?: number
}

export const Snackbar: React.FunctionComponent<SnackbarProps> = (
  props: SnackbarProps
) => {
  let { open, type, time } = props
  if (type !== 'info' && type !== 'warn' && type !== 'error') {
    type = 'info'
  }
  if (open === undefined) {
    open = true
  }
  if (time === undefined) {
    time = 1000
  }

  const [internalOpen, setInternalOpen] = useState(open)

  useEffect(() => {
    setTimeout(() => {
      setInternalOpen(false)
    }, time)
  })

  if (internalOpen) {
    return (
      <div className={styles.snackbar}>
        <span className={styles.sidecolor + ' ' + props.type}></span>
        <span className={styles.content}>{props.content}</span>
      </div>
    )
  } else {
    return <></>
  }
}
