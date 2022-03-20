import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import styles from './Layout.module.scss'
import { Menu } from './Menu/Menu'

interface LayoutProps {
  children: JSX.Element[] | JSX.Element
}
export function Layout(props: LayoutProps) {
  return (
    <main className={styles.Layout}>
      <Header>
        <Menu />
      </Header>
      <div>{props.children}</div>
      <Footer />
    </main>
  )
}
