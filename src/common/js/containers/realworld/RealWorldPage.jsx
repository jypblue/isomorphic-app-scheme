/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-08 16:21:39
 * @version $Id$
 * @describe react-redux-tutorial real-wrold 实例 ，将路由方式从redux-router转变成了react-router-redux
 * 中间件练习
 */

import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import Explore from '../../components/realworld/Explore';
import { resetErrorMessage } from '../../actions/realworld';

class RealWorldPage extends Component {
  static  propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    children:PropTypes.node
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.props.push(`/realworld/${nextValue}`)
  }

  renderErrorMessage() {
    const {errorMessage } = this.props;
    if (!errorMessage) {
      // statement
      return null;
    }

    return (
      <p style={{backgroundColor:'#e99',padding:10}}>
        <b>{errorMessage}</b>
        {' '}
        { <a href="#" onClick={this.handleDismissClick}>Dismiss</a>}
      </p>
    )
  }

  render() {
    const { children, inputValue } = this.props;
    return (
      <div className="rl-wrap">
      <Explore value={inputValue} onChange={this.handleChange} />
      {this.renderErrorMessage()}
      {children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  //debugger;
  //console.log(state);
  //console.log(state.routing.locationBeforeTransitions.pathname.substring(11))
  return {
    errorMessage:state.realworld.errorMessage,
    inputValue:state.routing.locationBeforeTransitions.pathname.substring(11)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  push
})(RealWorldPage)


















