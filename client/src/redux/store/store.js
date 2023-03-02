import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth-reducer';
import categoryReducer from '../reducers/category-reducer';
import productReducer from '../reducers/product-reducer';
import uiReducer from '../reducers/ui-reducer';
import userReducer from '../reducers/user-reducer';

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  ui: uiReducer,
  products: productReducer,
  categories: categoryReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
