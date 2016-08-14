/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-07-21 00:34:07
 * @version $Id$
 */
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, match, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import {
  syncHistoryWithStore,
  routerReducer
} from 'react-router-redux';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from '../common/js/utils/routes';
import configureStore from '../common/js/store/configureStore';
import DevTools from '../common/js/api/DevTools';

import 'antd/dist/antd.css';
import '../common/fonts/iconfont.css';
import '../common/css/core/reset.css';
import '../common/css/lib/layout.css';
import '../common/css/ui/todo.css';
import '../common/css/ui/realworld.css';
import '../common/css/page/hotel.css';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(browserHistory,initialState);
const history = syncHistoryWithStore(browserHistory, store);

const rootElement = document.getElementById('root');

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
        <Router {...renderProps} />
    </Provider>,
    rootElement
  );
});

// render(
//   <Provider store={store}>
//       <Router routes={routes} history={history} />
//   </Provider>,
//   rootElement
// );


if(process.env.NODE_ENV !== 'production') {
  render(
  <Provider store={store}>
    <DevTools/>
  </Provider>,
  document.getElementById('devtools')
)
}
