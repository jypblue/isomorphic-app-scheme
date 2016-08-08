/*
 * @Author: jypblue
 * @Date:   2016-08-07 16:43:18
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-08 11:19:45
 */

'use strict';
import React, {
  Component,
  PropTypes
} from 'react';
import {
  Link
} from 'React-router';

export default class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  }

  render() {
    const {
      login,
      avatarUrl,
      name
    } = this.props.user;

    return (
      <div className="User">
        <Link to={`/${login}`}>
          <img src="avatarUrl" width="72" height="72" alt=""/>
          <h3>
          {login} {name && <span>({name})</span>}
          </h3>
        </Link>
      </div>
    )
  }
}
