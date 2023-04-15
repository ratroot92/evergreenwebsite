import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth-reducer';
import categoryReducer from '../reducers/category-reducer';
import errorReducer from '../reducers/error-reducer';
import productReducer from '../reducers/product-reducer';
import uiReducer from '../reducers/ui-reducer';
import userReducer from '../reducers/user-reducer';
import adminReducer from '../reducers/admin-reducer';
import { rootReducer } from '../reducers';

const store = configureStore({
  reducer: {
    rootReducer,
    users: userReducer,
    auth: authReducer,
    ui: uiReducer,
    products: productReducer,
    categories: categoryReducer,
    errors: errorReducer,
    admin: adminReducer,
  },
});

export default store;
