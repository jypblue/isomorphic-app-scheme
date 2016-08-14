/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-12 10:27:40
 * @version $Id$
 */
import React, { Component } from 'react';
import HotelMaybeTable from './HotelMaybeTable';
import HotelDoingTable from './HotelDoingTable';
import HotelDoneTable from './HotelDoneTable';


class Tabspane extends Component {
  constructor(props) {
    super();

    this.state = {
       currentIndex : 0
    };
  }

  checkTitleIndex(index) {
    return index === this.state.currentIndex ? "tabTitle active" : "tabTitle";
  }

  checkItemIndex(index) {
    return index === this.state.currentIndex ? "tabItem show":"tabItem";
  }
  handleClick(index){
    this.setState(
    {
      currentIndex:index
    }
    )


  }

  render() {
    let self = this;
    return (
      <div>
      {
      /**
       * [className tabTitleWrap]
       * @type {String}
       * 动态生成Tab导航
       */
      }
        <ul className="tabTitleWrap">
          { React.Children.map(this.props.children , (element,index) => {
            return (
              /*
              箭头函数没有自己的this,这里的this继承自外围作用域，即组件本身
              ES6写法：()=>{this.setState({currentIndex:index})}
               */
              <li onClick={this.handleClick.bind(this,index)} className={ this.checkTitleIndex(index)}>
                {element.props.name}
              </li>
              );
          })}
        </ul>
      {/*Tab内容区域*/ }
      <div className="tabItemWrap">
        {React.Children.map(this.props.children, (element, index)=> {
          return (
            <div className={ this.checkItemIndex(index)}>
              {element}
            </div>
          );
        })}
        </div>
      </div>
    )
  }
}

export default class HotelTabs extends Component {
  render(){
    return (
      <div className="tabWrap">
        <Tabspane>
          <div name="疑似作弊酒店">
            <HotelMaybeTable />
          </div>
          <div name="正在处罚期的酒店">
            <HotelDoingTable />
          </div>
          <div name="历史处罚酒店">
            <HotelDoneTable />
          </div>
        </Tabspane>
      </div>
      )
  }
}

