/* eslint-disable import/prefer-default-export */
// /* eslint-disable no-unused-vars */
// import apiServer from '../../config/axios.config';
// import { startLoading, stopLoading } from './ui-actions';

import { startLoading, stopLoading } from './ui-actions';

const { default: apiServer } = require('../../config/axios.config');

// const startSetLogin = (payload) => async (dispatch) => {
//   try {
//     dispatch(startLoading());
//     const { data, status } = await apiServer.post(`/auth/login`, payload);
//     if (status === 200) {
//       dispatch({ type: 'SET_LOGIN', payload: data.data });
//     } else {
//       dispatch({ type: 'SET_LOGIN_FAILED', payload: false });
//     }
//   } catch (err) {
//     dispatch({ type: 'SET_LOGIN_FAILED', payload: false });
//   } finally {
//     dispatch(stopLoading());
//   }
// };

// const startSetAuth = () => async (dispatch) => {

//   try {
//     const { status, data } = await apiServer.get(`/auth/is-authenticated`);
//     if (status === 200) {
//       dispatch({ type: 'SET_IS_AUTHENTICATED', payload: true });
//     } else {
//       dispatch({ type: 'SET_IS_AUTHENTICATED', payload: false });
//     }
//   } catch (err) {
//     dispatch({ type: 'SET_IS_AUTHENTICATED', payload: false });
//   } finally {
//     dispatch(stopLoading());
//   }
// };

const adminLogout = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { status } = await apiServer.get(`/auth/logout`);
    if (status === 200) {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
    } else {
      //   dispatch({ type: 'DO_ADMIN_LOGIN', payload: true });
    }
  } catch (err) {
    // dispatch({ type: 'DO_ADMIN_LOGIN', payload: true });
  } finally {
    dispatch(stopLoading());
  }
};

// export { startSetLogin, startSetAuth, startLogout };

const adminLogin = (payload) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { status, data } = await apiServer.post(`/auth/admin/login`, payload);

    console.log('Status ==> ', status);
    console.log('Dataaa ==> ', data);

    if (status === 200) {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: data.data });
    } else {
      dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
    }
  } catch (err) {
    dispatch({ type: 'DO_ADMIN_LOGIN', payload: { user: null, isAuthenticated: false } });
  } finally {
    dispatch(stopLoading());
  }
};

export { adminLogin, adminLogout };
