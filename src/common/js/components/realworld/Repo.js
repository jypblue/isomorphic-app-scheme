/*
 * @Author: jypblue
 * @Date:   2016-08-07 16:42:55
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-08 11:27:26
 */

'use strict';
import React, {
  Component,
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';

export default class Repo extends Component {
  static propTypes = {
    repo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const {
      repo,
      owner
    } = this.props;
    const {
      login
    } = owner;
    const {
      name,
      description
    } = repo;
    return (
      <div className="Repo">
        <h3>
          <Link to={`/${login}/${name}`}>{name}</Link>
          {'by'}
          <Link to={`/${login}`}>{login}</Link>
        </h3>
        {description && <p>{description}</p>}
      </div>
    )
  }
}
