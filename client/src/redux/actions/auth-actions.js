/* eslint-disable  */
/* eslint-disable import/prefer-default-export */

const { default: apiServer } = require('../../config/axios.config');

const adminLogout = () => async (dispatch) => {
  try {
    const { status } = await apiServer.get(`/auth/logout`);
    if (status === 200) {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
    } else {
    }
  } catch (err) {
  } finally {
  }
};

const adminLogin = (payload) => async (dispatch) => {
  try {
    const { status, data } = await apiServer.post(`/auth/admin/login`, payload);

    if (status === 200) {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: data.data });
    } else {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
    }
  } catch (err) {
    dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
  } finally {
  }
};

export { adminLogin, adminLogout };
