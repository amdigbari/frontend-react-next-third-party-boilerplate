import { FC } from 'react'

import { useSecond } from './Second.hook'
import styles from './Second.module.scss'

export const Second: FC = () => {
  useSecond()

  return <div className={styles['container']}>Second Div</div>
}
