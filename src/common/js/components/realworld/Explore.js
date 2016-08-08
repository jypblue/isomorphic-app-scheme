/*
 * @Author: jypblue
 * @Date:   2016-08-07 16:41:58
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-08 10:59:50
 */

'use strict';
import React, {
  Component,
  PropTypes
} from 'react';
const GITHUB_REPO = 'https://github.com/rackt/redux';

export default class Explore extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      // statement
      this.setInputValue(nextProps.value)
    }
  }

  getInputValue() {
    return this.refs.input.value;
  }

  setInputValue(val) {
    this.refs.input.value = val;
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      // statement
      this.handleGoClick();
    }
  }

  handleGoClick() {
    this.props.onChange(this.getInputValue())
  }

  render() {
    return (
      <div>
        <p>请输入一个完整的用户名或者仓库名然后点击'GO'按钮：</p>
        <input type="text" size="45" defaultVakue={this.props.value} onKeyUp={this.handleKeyUp} ref="input"/>
        <button type="button" onClick={this.handleGoClick}>
        GO!
        </button>
      </div>
    )
  }



}
