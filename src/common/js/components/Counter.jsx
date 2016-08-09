/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-07-22 17:52:45
 * @version $Id$
 */
import React, { Component, PropTypes } from 'react';
import {Button} from 'antd';

class Counter extends Component {

  constructor(props,context) {
    super(props,context);
  }

  render() {
    const { incrementCounter, decrementCounter, counter } = this.props;
    return (
      <div className="posts">
        <h1>Counter</h1>
        <p>
          <b>Counter: {counter} times</b>
          {' '}
          <Button onClick={incrementCounter}>+</Button>
          {' '}
          <Button onClick={decrementCounter}>-</Button>
        </p>
      </div>

    );
  }
}

Counter.propTypes = {
  incrementCounter: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrementCounter: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default Counter;
