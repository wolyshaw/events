import { h, Component } from 'preact'
import './icons/empty.svg'
import './icons/close.svg'

export default class Icon extends Component {
  render() {
    return (
      <svg {...this.props}>
        <use xlinkHref={`#${this.props.type}`}></use>
      </svg>
    )
  }
}
