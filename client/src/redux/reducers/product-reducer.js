/* eslint-disable  */
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

const productReducer = (state = { allProducts: [] }, action = {}) => {
  switch (action.type) {
    case ADD_NEW_PRODUCT:
      return { ...state, allProducts: [action.payload, ...state.allProducts] };
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    default:
      return state;
  }
};

export default productReducer;
