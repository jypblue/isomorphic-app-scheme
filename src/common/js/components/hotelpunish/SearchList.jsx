/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-11 10:41:10
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react';
import Tablist from './SearchTabList';


export default class SearchList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { hlist, handleSubmit } = this.props;
    const table = hlist.length > 0 ? <Tablist hlist={ hlist } handleSubmit={handleSubmit}/> : '';
    return (
      <div className="rx-search-list">
        {table}
      </div>
    )
  }
}




