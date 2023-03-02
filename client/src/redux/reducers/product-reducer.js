/* eslint-disable  */
const productReducer = (state = { allProducts: [] }, action = {}) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCTS':
      let allProducts = action.payload;
      if (action.payload.length) {
        allProducts = action.payload.reduce((arr, user, index) => ((user.id = index + 1), arr.push(user), arr), []);
      }
      console.log('allProducts >>> ', allProducts);

      return { ...state, allProducts };

    default:
      return state;
  }
};

export default productReducer;
