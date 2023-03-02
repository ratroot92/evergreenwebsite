/* eslint-disable  */

const { default: apiServer } = require('../../config/axios.config');

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

const getAllProducts = (payload = {}) => {
  return async (dispatch) => {
    try {
      const { status, data } = await apiServer.get(`/product`);
      if (status === 200) {
        dispatch({ type: GET_ALL_PRODUCTS, payload: data.data });
      } else {
        dispatch({ type: GET_ALL_PRODUCTS, payload: [] });
      }
    } catch (err) {
      dispatch({ type: GET_ALL_PRODUCTS, payload: [] });
    }
  };
};

export { getAllProducts };
