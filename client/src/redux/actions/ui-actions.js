/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

const startLoading = () => async (dispatch) => {
  dispatch({ type: 'SET_LOADING', payload: true });
};
const stopLoading = () => async (dispatch) => {
  dispatch({ type: 'SET_LOADING', payload: false });
};
export { startLoading, stopLoading };
