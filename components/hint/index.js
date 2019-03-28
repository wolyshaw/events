import { h, render } from 'preact'
import styles from './index.less'

let DOM, timer

export const hint = (text = '', time = 5000) => {
  if(text) {
    if(DOM) {
      clean()
    }
    DOM = document.createElement('div')
    render(
      <div className={styles.hint}>{text}</div>,
      DOM
    )
    document.body.appendChild(DOM)
    timer = setTimeout(() => clean(), time)
  }
}

export const clean = () => {
  if(DOM) {
    DOM.remove()
    clearTimeout(timer)
  }
}
