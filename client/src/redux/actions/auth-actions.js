/* eslint-disable  */
/* eslint-disable import/prefer-default-export */

import { setLoading } from './ui-actions';

const { default: apiServer } = require('../../config/axios.config');

const adminLogout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { status } = await apiServer.get(`/auth/logout`);
    if (status === 200) {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
    } else {
    }
  } catch (err) {
  } finally {
    dispatch(setLoading(false));
  }
};

const adminLogin = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { status, data } = await apiServer.post(`/auth/admin/login`, payload);

    if (status === 200) {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: data.data });
    } else {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
    }
  } catch (err) {
    dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
  } finally {
    dispatch(setLoading(false));
  }
};

export { adminLogin, adminLogout };
