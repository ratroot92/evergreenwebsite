/* eslint-disable  */
const { default: apiServer } = require('../../config/axios.config');
const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_ALL_ROLES = 'GET_ALL_ROLES';

const getAllUsers = () => async (dispatch) => {
  try {
    const { status, data } = await apiServer.get(`/user`);
    if (status === 200) {
      dispatch({ type: GET_ALL_USERS, payload: data.data });
    } else {
      dispatch({ type: GET_ALL_USERS, payload: [] });
    }
  } catch (err) {
    dispatch({ type: GET_ALL_USERS, payload: [] });
  }
};

const getAllRoles = () => async (dispatch) => {
  try {
    const { status, data } = await apiServer.get(`/role`);
    if (status === 200) {
      dispatch({ type: GET_ALL_ROLES, payload: data.data });
    } else {
      dispatch({ type: GET_ALL_ROLES, payload: [] });
    }
  } catch (err) {
    dispatch({ type: GET_ALL_ROLES, payload: [] });
  }
};

export { getAllUsers, getAllRoles };
