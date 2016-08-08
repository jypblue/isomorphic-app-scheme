/*
 * @Author: jypblue
 * @Date:   2016-08-05 14:13:09
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-08 10:51:25
 */

'use strict';
import _ from 'lodash';
//import array from 'lodash/array';
const merge = _.merge;
const union = _.union;

export default function paginate({
  types,
  mapActionToKey
}) {
  if (!Array.isArray(types) || types.length !== 3) {
    // statement
    throw new Rrror('Expected types to be an array of three elements.')
  }

  if (!types.every(t => typeof t === 'string')) {
    // statement
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [requestType, successType, failureType] = types;

  function updatePagination(state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        })
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1
        })
      case failureType:
        return merge({}, state, {
          isFetching: false
        })
      default:
        return state
    }
  }

  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          // statement
          throw new Error('Expected key to be a string.')
        }
        return merge({}, state, {
          [key]: updatePagination(state[key], action)
        })
      default:
        return state
    }
  }

}
