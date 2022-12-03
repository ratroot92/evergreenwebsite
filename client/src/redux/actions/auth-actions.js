// /* eslint-disable no-unused-vars */
// import apiServer from '../../config/axios.config';
// import { startLoading, stopLoading } from './ui-actions';

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
//   console.log("======================================")
//   console.log("startSetAuth")
//   console.log("======================================")

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
//     console.log("Finally")
//     dispatch(stopLoading());
//   }
// };

// const startLogout = () => async (dispatch) => {
//   try {
//     dispatch(startLoading());
//     const { status } = await apiServer.get(`/auth/logout`);
//     if (status === 200) {
//       dispatch({ type: 'SET_LOGOUT', payload: false });
//     } else {
//       dispatch({ type: 'SET_LOGOUT', payload: true });
//     }
//   } catch (err) {
//     dispatch({ type: 'SET_LOGOUT', payload: true });
//   } finally {
//     dispatch(stopLoading());
//   }
// };

// export { startSetLogin, startSetAuth, startLogout };
