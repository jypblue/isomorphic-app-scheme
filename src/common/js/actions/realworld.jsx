/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-04 17:43:23
 * @version $Id$
 */

import { CALL_API, Schemas } from '../api/realworldMiddleware';
import * as actions from '../constants/realworld'

/**
 *  拉取一个单用户GitHub的API。
 *  依靠定义在 ../api/realworldMiddleware
 *  上的自定义中间件
 */
function fetchUser(login) {
  return {
    [CALL_API] : {
      types: [actions.USER_REQUEST, actions.USER_SUCCESS,actions.USER_FAILURE],
      endpoint: `users/${login}`,
      schema: Schemas.USER
    }
  }
}
/**
 * 获取从GitHub的单个用户API(被缓存的不包括)。
 * 依靠Redux thunk的中间件
 */

export function loadUser(login, requiredFields = []) {
  return (dispatch, getState) => {
    //debugger;
    const user = getState().realworld.entities.users[login];
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      // statement
      return null;
    }

    return dispatch(fetchUser(login));
  }
}


/**
 *  从GitHub API 上获取一个存储库。
 *  依靠定义在 ../api/realworldMiddleware
 *  上的自定义中间件。
 */

function fetchRepo(fullName) {
  return {
    [CALL_API]:{
      types:[actions.REPO_REQUEST,actions.REPO_SUCCESS,actions.REPO_FAILURE],
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPO
    }
  }
}


/**
 * 获取从GitHub的单个用户API(被缓存的不包括)。
 * 依靠Redux thunk的中间件
 */

export function loadRepo(fullName, requiredFields = []) {
  return (dispatch, getState) => {
    const repo = getState().realworld.entities.repos[fullName];
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
      // statement
      return null;
    }

    return dispatch(fetchRepo(fullName))
  }
}

/**
 * 获取一个特定用户一页被赞过的库
 */

function fetchStarred(login, nextPageUrl) {
  return {
    login,
    [CALL_API]: {
      types: [actions.STARRED_REQUEST, actions.STARRED_SUCCESS,actions.STARRED_FAILURE],
      endpoint:nextPageUrl,
      schema: Schemas.REPO_ARRAY
    }
  }
}

export function loadStarred(login, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `users/${login}/starred`,
      pageCount = 0
    } = getState().realworld.pagination.starredByUser[login] || {};

    if (pageCount > 0 && !nextPage) {
      // statement
      return null;
    }

    return dispatch(fetchStarred(login,nextPageUrl))
  }
}


/**
 * 获取一页没有star的仓库
 */

function fetchStargazers(fullName, nextPageUrl) {
  return {
    fullName,
    [CALL_API]: {
      types:[actions.STARGAZERS_REQUEST,actions.STARGAZERS_SUCCESS,actions.STARGAZERS_FAILURE],
      endpoint:nextPageUrl,
      schema:Schemas.USER_ARRAY
    }
  }
}


/**
 *
 */
export function loadStargazers(fullName,nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `repos/${fullName}/stargazers`,
      pageCount = 0
    } = getState().realworld.pagination.stargazersByRepo[fullName] || {};

    if (pageCount > 0 && !nextPage) {
      // statement
      return null;
    }

    return dispatch(fetchStargazers(fullName, nextPageUrl))
  }
}


export function resetErrorMessage() {
  return {
    type: actions.RESET_ERROR_MESSAGE
  }
}










































