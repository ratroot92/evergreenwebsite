/* eslint-disable  */
const productReducer = (state = { allCategories: [] }, action = {}) => {
  switch (action.type) {
    case 'GET_ALL_CATEGORIES':
      let allCategories = action.payload;
      if (action.payload.length) {
        allCategories = action.payload.reduce((arr, user, index) => ((user.id = index + 1), arr.push(user), arr), []);
      }
      console.log('allCategories >>> ', allCategories);

      return { ...state, allCategories };

    default:
      return state;
  }
};

export default productReducer;
