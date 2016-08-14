/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-10 17:30:24
 * @version $Id$
 */

import React, { Component, PropTypes} from 'react';
import {render} from 'react-dom';
import classNames from 'classnames';
import SearchInput from './SearchInput';
import SearchList from './SearchList';
import HotelTabs from './HotelTabs';

var products = [
  {
      id: 1,
      name: "上海1",
      stime: "2015-10-11",
      etime: "2015-11-11",
      nums: "0.8"
  },{
      id: 2,
      name: "上海2",
      stime: "2016-08-11",
      etime: "2016-10-11",
      nums:"0.5"
  }
];

export default class Hotel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hlist: '',
      tabshow: false
    };
    this.searchResult = this.searchResult.bind(this);
    this.navToggle = this.navToggle.bind(this);
  }

  searchResult(value){
    console.log(value);
    this.setState({
      hlist: products
    });
  }

  handleSubmit(obj){
    console.log(obj);
  }
  // 显示隐藏
  navToggle(e) {
    this.setState({
      tabshow: !this.state.tabshow
    })
  }
  render () {

    const tabsClass = classNames('hotel-wrap',{ show : this.state.tabshow});
    const showHotel = classNames({hide:this.state.tabshow});
    const hideHotel = classNames('hide',{show: this.state.tabshow})
    return (
      <div className="rx-hotel">
        <div className="hotel-search-item">
          {/*搜索框组件，获取数据拉取数据展示*/}
          <SearchInput
            placeholder="请输入作弊酒店ID"
            onSearch={this.searchResult}
            value =''
            style={{ width: 200 }}
          />
          <SearchList hlist={this.state.hlist} handleSubmit={this.handleSubmit}/>
        </div>
        <div className="hotel-tabs-item">
          <div className="hotel-tabs-toggle">
            <h3 className={showHotel}><a href="###" onClick={this.navToggle} >显示已经处罚的酒店</a></h3>
            <h3 className={hideHotel}><span className="tit">已处罚的酒店</span><a href="###" onClick={this.navToggle}>收起</a></h3>
          </div>
          {/*tabs切换，每个切换再一个组件*/}
          <div className={tabsClass}>
            <HotelTabs />
          </div>
        </div>


      </div>
    )
  }
}
