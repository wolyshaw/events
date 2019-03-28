import { h, render } from 'preact'
import styles from './index.less'

let DOM, count = 0

export const loading = () => {
  if(count === 0) {
    DOM = document.createElement('div')
    render(
      <div className={styles.boxLoading}></div>,
      DOM
    )
    document.body.appendChild(DOM)
  }
  count ++
}

export const loaded = () => {
  count --
  if(DOM) {
    if(count < 1) {
      DOM.remove()
      count = 0
    }
  }
}
