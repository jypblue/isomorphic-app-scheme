/*
 * @Author: jypblue
 * @Date:   2016-08-05 13:39:40
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-08 10:50:56
 */

'use strict';
import * as ActionTypes from '../constants/realworld';
import _ from 'lodash';
import paginate from './realworldPager';
import {
  combineReducers
} from 'redux';
const merge = _.merge;

function entities(state = {
  users: {},
  repos: {}
}, action) {
  if (action.response && action.response.entities) {
    // statement
    return merge({}, state, action.response.entities);
  }

  return state;
}

function errorMessage(state = null, action) {
  const {
    type,
    error
  } = action;
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    // statement
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
})


const realworld = combineReducers({
  entities,
  pagination,
  errorMessage
})

export default realworld;
