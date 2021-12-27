import React from 'react'

import styles from './Button.module.scss'

interface ButtonProps {
  type?: 'button' | 'submit'
  children: React.ReactNode
  disabled?: boolean
}

export const Button: React.FunctionComponent<ButtonProps> = (
  props: ButtonProps
) => {
  return (
    <button disabled={props.disabled} className={styles.button} type={props.type ?? 'button'}>
      {props.children}
    </button>
  )
}

export default Button
