import React from 'react'

import styles from './Modal.module.scss'

interface ModalProps {
  children: React.ReactNode
  onClose?: () => void
}

export const Modal: React.FunctionComponent<ModalProps> = (
  props: ModalProps
) => {
  return <div className={styles.Modal}>{props.children}</div>
}
