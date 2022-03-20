import React, { useState, createContext } from 'react'

import { Snackbar } from '../components/atom/Snackbar/Snackbar'

interface SnackbarCtxt {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (err: Error) => void
}

export const SnackbarContext = createContext<SnackbarCtxt>(null!)

export const SnackbarContextCmpnt: React.FunctionComponent = (props) => {
  const [type, setType] = useState<string | null>(null)
  const [content, setContent] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const info = (msg: string): void => {
    setType('info')
    setContent(msg)
    setOpen(true)
  }
  const warn = (msg: string): void => {
    setType('warn')
    setContent(msg)
    setOpen(true)
  }
  const error = (err: Error): void => {
    setType('error')
    setContent(err.message)
    setOpen(true)
  }

  const initState: SnackbarCtxt = {
    info,
    warn,
    error,
  }

  return (
    <SnackbarContext.Provider value={initState}>
      {props.children}
      {type !== null && content !== null ? (
        <Snackbar open={open} content={content} type={type} />
      ) : (
        <></>
      )}
    </SnackbarContext.Provider>
  )
}
