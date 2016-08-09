/*
 * @Author: jypblue
 * @Date:   2016-08-07 16:41:58
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-08 20:10:36
 */

'use strict';
import React, {
  Component,
  PropTypes
} from 'react';
import { Input,Button } from 'antd';

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
      <div className="search-input">
        <p>查询github用户:</p>
        <input type="text" className="rl-input" defaultValue={this.props.value} onKeyUp={this.handleKeyUp} ref="input"/>
        <Button type="button" onClick={this.handleGoClick}>
        GO!
        </Button>
      </div>
    )
  }



}
