import {
  combineReducers
} from 'redux';
import {
  routerReducer
} from 'react-router-redux';

import undoable from 'redux-undo';

import user from './user';
import counter from './counter';
import layout from './layout';
import todos from './todos';
import version from './version';
import realworld from './realworld';

// entities: realworld.entities,
// pagination: realworld.pagination,
// errorMessage: realworld.errorMessage,

const rootReducer = combineReducers({
  user: user,
  version: version,
  counter: undoable(counter),
  layout: undoable(layout),
  todos: undoable(todos),
  realworld: realworld,
  routing: routerReducer
});

export default rootReducer;
