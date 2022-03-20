import { AppBar, Toolbar } from '@mui/material'
import React from 'react'

export const Header: React.FunctionComponent = (props) => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
