'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {loadRepo, loadStargazers } from '../../actions/realworld';
import Repo from '../../components/realworld/Repo';
import User from '../../components/realworld/User';
import List from '../../components/realworld/List';


function loadData(props) {
  const {fullName } = props;
  props.loadRepo(fullName, ['description']);
  props.loadStargazers(fullName);
}

class RepoPage extends Component {
  static propTypes = {
    repo: PropTypes.object,
    fullName: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    owner:PropTypes.object,
    stargazers:PropTypes.array.isRequired,
    stargazersPagination:PropTypes.object,
    loadRepo: PropTypes.func.isRequired,
    loadStargazers:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  //在挂载发生之前立即被调用
  componentWillMount() {
    loadData(this.props)
  }

  //当一个挂载的组件接收到新的props的时候被调用
  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      // statement
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadStargazers(this.props.fullName,true);
  }

  renderUser(user) {
    return (
      <User user={user} key={user.login} />
    )
  }

  render() {
    const { repo, owner, name } = this.props;
    if (!repo || !owner) {
      // statement
      return <h1><i>Loading {name} details...</i></h1>
    }

    const {stargazers, stargazersPagination } = this.props;

    return (
      <div className="rl-repo">
        <Repo repo={repo} owner={owner} />
        <List renderItem={this.renderUser}
              items={stargazers}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading stargazers of ${name}...`}
              {...stargazersPagination} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  //URL为React-Router-Redux模式Url
  let pathname = state.routing.locationBeforeTransitions.pathname;
  const login = pathname.substring(11,pathname.lastIndexOf('\/'));
  const name = pathname.substring(pathname.lastIndexOf('\/')+1);
  //console.log(login+'-'+name);
  const {
    pagination: {stargazersByRepo},
    entities:{users,repos}
  } = state.realworld;
  const fullName = `${login}/${name}`;
  const stargazersPagination = stargazersByRepo[
  fullName] || {ids:[]};
  const stargazers = stargazersPagination.ids.map(id => users[id]);

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo:repos[fullName],
    owner:users[login]
  }
}

export default connect(mapStateToProps,{
  loadRepo,
  loadStargazers
})(RepoPage);
















