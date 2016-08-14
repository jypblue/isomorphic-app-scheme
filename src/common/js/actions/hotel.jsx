/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-08-11 15:40:36
 * @version $Id$
 */

import * as actions from '../constants/hotel';
import Mock from 'mockjs';
import fetch from 'isomorphic-fetch';

Mock.mock('http://g.cn/\.json', {
    'id|1-100':  100，
    'name'     : '[@name](/user/name)()',
    'sdate':'[@date]("yyyy-MM-dd")',
    'edate':'[@date]("yyyy-MM-dd")',
    'nums|0.1': 0.8
});

function fetchHotel(searchlist){
  return dispatch => {

  }
  return fetch(`http://g.cn/${searchlist}.json`)
    .then(response => response.json())
    .then(console.log(json))
}


export function queryHotel(searchlist) {
    return {
      type:actions.QUERYHOTEL,
      searchlist
    }
}

// 参考

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];

  if (!posts) {
    // statement
    return true;
  } else if(posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // statement
      return dispatch(fetchPosts(subreddit));
    }
  }
}
