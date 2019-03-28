import { h, Component } from 'preact'
import Portal from 'preact-portal'
import propTypes from 'prop-types'
import CSSTransitionGroup from 'preact-transition-group'
import classnames from 'classnames'
import Icon from '@/components/icon'
import { setBodyOverflow, cleanBodyOverflow } from '@/utils'
import styles from './index.less'

class Content extends Component {
  static propTypes = {
    close: propTypes.func.isRequired,
    mask: propTypes.bool.isRequired
  }


  componentDidMount() {
    setBodyOverflow()
  }

  componentWillUnmount() {
    cleanBodyOverflow()
  }

  render() {
    return (
      <div className={classnames(styles.model, this.props.className)}>
        {this.props.hideMask ? null : <div onClick={this.props.cleanMaskEvent ? null : this.props.close} className={styles.mask}></div>}
        <div className={styles.container}>
          {this.props.hideClose ? null : <Icon onClick={this.props.close} type="close" className={styles.close}/>}
          <div className={classnames(styles.content, this.props.contentClassName)}>{this.props.children}</div>
          {this.props.footer ? (
            <div className={styles.footer}>{this.props.footer}</div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default class Model extends Component {

  render() {
    return (
      <Portal into="body">
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.props.visibility ? (
            <Content {...this.props}/>
          ) : null}
        </CSSTransitionGroup>
      </Portal>
    )
  }
}
