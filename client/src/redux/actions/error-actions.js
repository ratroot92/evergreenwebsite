/* eslint-disable  */

const SET_ERROR = 'SET_ERROR';
const CLEAR_ERRORS = 'CLEAR_ERRORS';

const setStoreError = (payload = {}) => {
  return async (dispatch) => {
    dispatch({ type: SET_ERROR, payload: payload });
  };
};
const clearStoreErrors = (payload = {}) => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS, payload: [] });
  };
};

export { setStoreError, clearStoreErrors };
