import React from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Menu from './Menu/Menu'

export const Layout: React.FunctionComponent = (props) => {
  return (
    <>
      <Header>
        <Menu />
      </Header>
      <div>{props.children}</div>
      <Footer />
    </>
  )
}

export default Layout
