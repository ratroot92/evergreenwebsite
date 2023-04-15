/* eslint-disable  */
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};
export const rootReducer = createReducer(initialState, {
  setIsAuthenticated: (state, action) => {
    state.isAuthenticated = action.payload;
  },
});
