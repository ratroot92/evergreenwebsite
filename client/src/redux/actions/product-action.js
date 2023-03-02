/* eslint-disable  */

const { default: apiServer } = require('../../config/axios.config');

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';

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

const addNewProduct = (payload = {}) => {
  return async (dispatch) => {
    try {
      const { status, data } = await apiServer.post(`/product`, payload);
      console.log('status', status);
      console.log('data', data);
      if (status === 200) {
        console.log('dispatchin');
        dispatch({ type: ADD_NEW_PRODUCT, payload: data.data });
      }
    } catch (err) {
      console.log(err.data);
      if (err.status) {
        switch (err.status) {
          case 409:
            return dispatch({ type: 'SET_ERROR', payload: `${err.message}` });
        }
      }
      console.log(Object.keys(err));
      // if(status===409){
      //   if(message)
      // }
    }
  };
};

export { getAllProducts, addNewProduct };
