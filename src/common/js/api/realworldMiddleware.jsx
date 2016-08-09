/*
 * @Author: jypblue
 * @Date:   2016-08-04 15:33:21
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-04 16:22:38
 */

'use strict';
import {
  Schema,
  arrayOf,
  normalize
} from 'normalizr';
import {
  camelizeKeys
} from 'humps';
import 'isomorphic-fetch';

/**
 * 提取物从GitHub API响应下一页的URL
 */

function getNextPageUrl(response) {
  const link = response.headers.get(link);
  if (!link) {
    // statement
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1);
}

const API_ROOT = 'https://api.github.com/';

/**
 * 取一个API的响应和恢复正常结果JSON根据图式.
 * 这使得每个API的响应都有相同的形状，无论它是如何嵌套的
 */
function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  return fetch(fullUrl).then(response =>
    response.json().then(json => ({
      json,
      response
    }))
  ).then(
  ({json,response}) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    const camelizedJson = camelizeKeys(json);
    const nextPageUrl = getNextPageUrl(response);

    return Object.assign({}, normalize(camelizedJson, schema), {
      nextPageUrl
    })
  })
}

/**
 * 我们用这个normalizr模式变换API响应从嵌套形式的平面形式，回购和用户放在`实体`，嵌套的JSON对象的ID代替。这是消费的减速器非常方便，因为我们可以很容易地建立一个规范的树并保持更新我们获取更多的数据。
 */

const userSchema = new Schema('users', {
  idAttribute: 'login'
});

const repoSchema = new Schema('repos', {
  idAttribute: 'fullName'
})

repoSchema.define({
  owner: userSchema
})

//在GitHub API响应模式
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  REPO: repoSchema,
  REPO_ARRAY: arrayOf(repoSchema)
}

/**
 *Action key 作为调用API进行Redux中间件的解释。
 */

//对Symbol实例的描述
export const CALL_API = Symbol('Call API');

/**
 * 一个对call_api信息指定动作的redux中间件。
 * 当执行的行动和承诺的呼叫是被搜索。
 */

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    // statement
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
     // statement
     endpoint = endpoint(store,getState())
  }

  if (typeof endpoint !== 'string') {
    // statement
    throw new Error('Specify a string endpoint URL.')
  }

  if (!schema) {
    // statement
    throw new Error('Specify one of the exported Schemas.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    // statement
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    // statement
    throw new Error('Expected action types to be string.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action,data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}














