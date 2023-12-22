import { useEffect } from 'react'

import styles from './Second.module.scss'

export const useSecond = () => {
  // eslint-disable-next-line no-console
  useEffect(() => console.log(styles['container']), [])
}
