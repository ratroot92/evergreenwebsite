import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import adminReducer from './features/admin/adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;
