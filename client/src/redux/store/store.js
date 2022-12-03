import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth-reducer';
import uiReducer from '../reducers/ui-reducer';
import userReducer from '../reducers/user-reducer';

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  ui: uiReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
