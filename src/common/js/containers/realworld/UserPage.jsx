/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-08 16:01:22
 * @version $Id$
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadStarred } from '../../actions/realworld'
import User from '../../components/realworld/User'
import Repo from '../../components/realworld/Repo'
import List from '../../components/realworld/List'
import _ from 'lodash';
const zip = _.zip;

function loadData(props) {
  const { login } = props;
  //console.log(login);
  props.loadUser(login, [ 'name' ])
  props.loadStarred(login)
}

class UserPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    user: PropTypes.object,
    starredPagination: PropTypes.object,
    starredRepos: PropTypes.array.isRequired,
    starredRepoOwners: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadStarred: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.renderRepo = this.renderRepo.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  //在挂载发生之前立即被调用
  componentWillMount() {
    loadData(this.props)
  }

  //当一个挂载的组件接收到新的props的时候被调用
  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    }
  }

  handleLoadMoreClick() {
    this.props.loadStarred(this.props.login, true)
  }

  renderRepo([ repo, owner ]) {
    return (
      <Repo repo={repo}
            owner={owner}
            key={repo.fullName} />
    )
  }

  render() {

    const { user, login } = this.props;
    if (!user) {
      return <h1><i>Loading {login}’s profile...</i></h1>
    }

    const { starredRepos, starredRepoOwners, starredPagination } = this.props
    return (
      <div className="rl-user">
        <User user={user} />
        <List renderItem={this.renderRepo}
              items={zip(starredRepos, starredRepoOwners)}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${login}’s starred...`}
              {...starredPagination} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  //console.log(state);
  const  login  = state.routing.locationBeforeTransitions.pathname.substring(11);
  const {
    pagination: { starredByUser },
    entities: { users, repos }
  } = state.realworld;

  const starredPagination = starredByUser[login] || { ids: [] }
  const starredRepos = starredPagination.ids.map(id => repos[id])
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login]
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadStarred
})(UserPage)


