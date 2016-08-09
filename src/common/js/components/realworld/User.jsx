/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-09 18:29:25
 * @version $Id$
 */

'use strict';
import React, {
  Component,
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';

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
      <div className="user">
        <Link to={`/realworld/${login}`}>
          <img src={avatarUrl} width="72" height="72" alt=""/>
          <h3>
          {login} {name && <span>({name})</span>}
          </h3>
        </Link>
      </div>
    )
  }
}

