/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2016-07-28 10:50:51
 * @version $Id$
 */

import { Route,IndexRoute } from "react-router";
import React from "react";

import App from "../containers/App";

//Redux Smart
import CounterPage from "../containers/CounterPage";
import TodoPage from "../containers/TodoPage";

//realworld
import RealWorldPage from '../containers/realworld/RealWorldPage';
import RepoPage from '../containers/realworld/RepoPage';
import UserPage from '../containers/realworld/UserPage';

//Redux Dumb
import HomePage from "../components/Home";
import AboutPage from "../components/About";
import error404 from "../components/404";

import Hotel from '../components/hotelpunish/Hotel';


// const AboutPage = (location, cb) => {
//     require.ensure([], require => {
//       cb(null, require('../components/About'))
//     },'about')
// }



export default (
  <Route name="app" path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="home" component={HomePage} />
      <Route path="todo" component={TodoPage} />
      <Route path="counter" component={CounterPage} />
      <Route path="realworld" component={RealWorldPage}>
        <Route path="/realworld/:login/:name"
           component={RepoPage} />
        <Route path="/realworld/:login"
           component={UserPage} />
      </Route>
      <Route path="hotel" component={Hotel} />
      <Route path="about" component={AboutPage} />
      <Route path="*" component={error404}/>
  </Route>
);

function loadComponent(module) {
  return !process.env.NODE_ENV
    ? lazyLoadComponent(module)
    : (location, cb) => cb(null, module);
}

function lazyLoadComponent(lazyModule) {
  return (location, cb) => {
    lazyModule(module => cb(null, module))
  }
}

function lazyLoadComponents(lazyModules) {
  return (location, cb) => {
    const moduleKeys = Object.keys(lazyModules);
    const promises = moduleKeys.map(key =>
      new Promise(resolve => lazyModules[key](resolve))
    )

    Promise.all(promises).then(modules => {
      cb(null, modules.reduce((obj, module, i) => {
        obj[moduleKeys[i]] = module;
        return obj;
      }, {}))
    })
  }
}





