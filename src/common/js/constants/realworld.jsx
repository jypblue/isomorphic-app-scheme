/*
* @Author: jypblue
* @Date:   2016-08-04 15:16:24
* @Last Modified by:   jypblue
* @Last Modified time: 2016-08-04 15:16:24
*/

'use strict';

// 从github上获取一个用户
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

//从github上获取一个仓库
export const REPO_REQUEST = 'REPO_REQUEST';
export const REPO_SUCCESS = 'REPO_SUCCESS';
export const REPO_FAILURE = 'REPO_FAILURE';

//从github上获取特定用户的一页仓库
export const STARRED_REQUEST = 'STARRED_REQUEST';
export const STARRED_SUCCESS = 'STARRED_SUCCESS';
export const STARRED_FAILURE = 'STARRED_FAILURE';

//从github上获取
export const STARGAZERS_REQUEST = 'STARGAZERS_REQUEST';
export const STARGAZERS_SUCCESS = 'STARGAZERS_SUCCESS';
export const STARGAZERS_FAILURE = 'STARGAZERS_FAILURE';

//重置
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
