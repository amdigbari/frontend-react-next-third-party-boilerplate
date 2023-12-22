import { Second } from 'components/second'
import { FC } from 'react'

import styles from './First.module.scss'

export const First: FC = () => (
  <div className={styles['container']}>
    <p>First Div</p>

    <Second />
  </div>
)
