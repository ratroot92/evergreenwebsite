/* eslint-disable  */

import APP_ACTIONS from '../constants/actions';

const setLoading = (payload) => async (dispatch) => {
  dispatch({ type: APP_ACTIONS.UI_ACTIONS.SET_LOADING, payload });
};

const setNotifier = (payload) => async (dispatch) => {
  dispatch({ type: APP_ACTIONS.UI_ACTIONS.SET_NOTIFICATION, payload });
};

export { setLoading, setNotifier };
