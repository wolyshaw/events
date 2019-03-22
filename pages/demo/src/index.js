import { h, render } from 'preact'
import './empty.svg'
import styles from './index.less'

render(
  <div>
    <p>preact</p>
    <svg>
      <use xlinkHref="#empty"></use>
    </svg>
  </div>,
  document.getElementById('app')
)
