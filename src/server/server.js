/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-07-21 15:50:36
 * @version $Id$
 */
import express from 'express';
import open from 'open';
import colors from 'colors';
const path = require('path');
const env = process.argv[2] || process.env.NODE_ENV;
const dev = 'production' !== env;

import React from 'react';
import {
  renderToString
} from 'react-dom/server';
import {
  createMemoryHistory,
  RouterContext,
  match
} from 'react-router';
import {
  Provider
} from 'react-redux';
import createLocation from 'history/lib/createLocation';
import {
  syncHistoryWithStore
} from 'react-router-redux';
require('object-assign');

import {
  fetchComponentDataBeforeRender
} from '../common/js/api/fetchComponentDataBeforeRender';
import configureStore from '../common/js/store/configureStore';

import {
  getUser
} from '../common/js/api/user';
import routes from '../common/js/utils/routes';


const app = express();
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Redux Demo</title>
        <link rel="stylesheet" type="text/css" href="/css/index.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <div id="devtools"></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/js/vender.js"></script>
        <script src="/js/index.js"></script>
      </body>
    </html>
  `;
}

//dev模式
if (dev) {
  let webpack = require('webpack');
  let webpackDevMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');
  let webpackConfig = require('../../webpack-dev.config.js');
  const compiler = webpack(webpackConfig);
  // app.use(webpackDevMiddleware(compiler, {
  //   noInfo: true,
  //   publicPath: webpackConfig.output.publicPath
  // }));
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/', express.static(__dirname + '/../../dist'));
}


app.get('/*', function(req, res) {
  getUser(user => {
    if (!user) {
      return res.status(401).end('Not Authorised');
    }
    const memoryHistory = createMemoryHistory(req.url);
    const store = configureStore(memoryHistory, {
      user: user,
      version: "1.0.0"
    });
    const history = syncHistoryWithStore(memoryHistory, store)

    match({
      history,
      routes,
      location: req.url
    }, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err);
        return res.status(500).end('Internal server error');
      }

      if (!renderProps) {
        return res.status(404).end('Not found');
      }

      const InitialView = (
        <Provider store={store}>
          <RouterContext  {...renderProps} />
        </Provider>
      );

      fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
        .then(html => {
          const componentHTML = renderToString(InitialView);
          const initialState = store.getState();
          res.status(200).end(renderFullPage(componentHTML, initialState))
        })
        .catch(err => {
          console.log(err)
          res.end(renderFullPage("", {}))
        });
    });


  });
});

const server = app.listen(3002, () => {
  console.log('App listening at:3002'.info);
  open('http://localhost:3002')
});

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  dev: 'blue',
  error: 'red'
});
