/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-11 17:40:46
 * @version $Id$
 */

import React, { Component,PropTypes,Children} from 'react';
import { Input } from 'antd';

export default class Tablist extends Component {
  constructor(props) {
    super(props);
  //  const self = this;

    //this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const {hlist,handleSubmit} = this.props;
    return(
        <table className="">
          <thead>
            <tr>
              <th>酒店ID</th>
              <th>酒店名称</th>
              <th>处罚开始时间</th>
              <th>处罚结束时间</th>
              <th>点评分惩罚系数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              hlist.map(function(el, i) {
                return (
                  <Tr key={i} el={el} i={i} handleSubmit={handleSubmit}/>
                )
              })
            }
          </tbody>
        </table>
    )
  }
}

class Tr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stime: this.props.el.stime,
      etime:this.props.el.etime,
      nums:this.props.el.nums
    };

    this.handleChangeStime = this.handleChangeStime.bind(this);
    this.handleChangeEtime = this.handleChangeEtime.bind(this);
    this.handleChangeNums = this.handleChangeNums.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeStime(e) {
    this.setState({
      stime: e.target.value
    })
  }
  handleChangeEtime(e) {
    this.setState({
      etime: e.target.value
    })
  }
  handleChangeNums(e) {
    this.setState({
      nums: e.target.value
    })
  }
  handleClick(e){
    //debugger;
    let obj = {
      id: this.refs.id.innerText,
      name:this.refs.name.innerText,
      stime:this.refs.stime.value,
      etime:this.refs.etime.value,
      nums:this.refs.nums.value
    }

    this.props.handleSubmit(obj);
  }
  render() {
    const {el , i } = this.props;
    return (
            <tr>
              <td><span ref="id" key={`${i}1`}>{el.id}</span></td>
              <td><span ref="name" key={`${i}2`}>{el.name}</span></td>
              <td><input type="text" value={this.state.stime} key={`${i}3`}  onChange={this.handleChangeStime} ref="stime"/></td>
              <td><input type="text" value={this.state.etime} key={`${i}4`} onChange={this.handleChangeEtime} ref="etime"/></td>
              <td><input type="text" value={this.state.nums}  key={`${i}5`} onChange={this.handleChangeNums} ref="nums"/></td>
              <td><a href="###" onClick={this.handleClick}>提交</a></td>
            </tr>
        );
  }
}











