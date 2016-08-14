/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-14 14:57:47
 * @version $Id$
 */

import React, {Component} from 'react';


export default class HMaybeTableList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBtn = this.handleBtn.bind(this);
  }

  handleBtn(){

  }
  handleCancel(){

  }
  render() {
    const { hmaytable } = this.props;
    const handleBtn = this.handleBtn;
    const handleCancel = this.handleCancel;
    return (
      <table>
        <thead>
          <tr>
            <th>酒店ID</th>
            <th>酒店名称</th>
            <th>疑似作弊点评数</th>
            <th>作弊类型</th>
            <th>5分/非5分佣金比</th>
            <th>低佣点评率</th>
            <th>整体点评率</th>
            <th>是否在处罚期</th>
            <th>处罚开始时间</th>
            <th>处罚结束时间</th>
            <th>处罚系数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            hmaytable.map(function(el,i){
              return (
                <tr key={i}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.commentNums}</td>
                  <td>{el.type}</td>
                  <td>{el.scale}</td>
                  <td>{el.rate}</td>
                  <td>{el.allRate}</td>
                  <td>{el.punish}</td>
                  <td><input type="text" value={el.stime}/></td>
                  <td><input type="text" value={el.etime}/></td>
                  <td><input type="text" value={el.nums}/></td>
                  <td>
                    <a href="#" onClick={handleBtn}>提交</a>
                    <a href="#" onClick={handleCancel}>忽略</a>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

}
