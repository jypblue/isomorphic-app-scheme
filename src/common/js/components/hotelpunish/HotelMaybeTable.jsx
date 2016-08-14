/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-13 23:39:31
 * @version $Id$
 */

import React, { Component } from 'react';
import SearchInput from './SearchInput';
import HMaybeTableList from './HMaybeTableList';

var hmaytable = [
{
  id: 1,
  name: "上海1",
  commentNums: 10,
  type:1,
  scale:0.5 ,
  rate: "60%",
  allRate: "80%",
  punish: false,
  stime: "2015-10-11",
  etime: "2015-11-11",
  nums: "0.8"
},{
  id: 2,
  name: "上海2",
  commentNums: 20,
  type:2,
  scale:0.4 ,
  rate: "60%",
  allRate: "80%",
  punish: false,
  stime: "2015-10-11",
  etime: "2015-11-11",
  nums: "0.8"
}]


export default class HotelMaybeTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hmaytable: hmaytable
    };
    this.searchResult = this.searchResult.bind(this);
  }

  searchResult(value) {
    console.log(value);
    this.setState({
      hmaytable: hmaytable
    })
  }
  render() {
    return (
      <div className="h-may-punish">
        疑似作弊点评数>=
        <SearchInput
          onSearch={this.searchResult}
          value = '10'
          style={{ width: 60 }}
        />
        <HMaybeTableList hmaytable={this.state.hmaytable} />
      </div>
    )
  }
}
