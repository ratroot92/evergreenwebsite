/* eslint-disable  */

const setLoading = (payload) => async (dispatch) => {
  dispatch({ type: 'SET_LOADING', payload });
};

export { setLoading };
