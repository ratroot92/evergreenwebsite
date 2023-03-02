/* eslint-disable  */

const { default: apiServer } = require('../../config/axios.config');

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

const getAllCategories = (payload = {}) => {
  return async (dispatch) => {
    try {
      const { status, data } = await apiServer.get(`/category`);
      if (status === 200) {
        dispatch({ type: GET_ALL_CATEGORIES, payload: data.data });
      } else {
        dispatch({ type: GET_ALL_CATEGORIES, payload: [] });
      }
    } catch (err) {
      dispatch({ type: GET_ALL_CATEGORIES, payload: [] });
    }
  };
};

export { getAllCategories };
