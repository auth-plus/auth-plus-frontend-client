import Footer from './Footer/Footer'
import Header from './Header/Header'
import Menu from './Menu/Menu'
interface LayoutProps {
  children: JSX.Element[] | JSX.Element
}
export function Layout(props: LayoutProps) {
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
