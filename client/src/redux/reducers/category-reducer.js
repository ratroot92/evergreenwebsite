/* eslint-disable  */
const productReducer = (state = { allCategories: [], selectedCategory: {} }, action = {}) => {
  switch (action.type) {
    case 'GET_ALL_CATEGORIES':
      let allCategories = action.payload;
      if (action.payload.length) {
        allCategories = action.payload.reduce((arr, user, index) => ((user.id = index + 1), arr.push(user), arr), []);
      }
      return { ...state, allCategories };

    case 'ADD_NEW_CATEGORY': {
      return { ...state, allCategories: [action.payload, ...state.allCategories] };
    }
    case 'SET_SELECTED_CATEGORY': {
      return { ...state, selectedCategory: action.payload };
    }

    default:
      return state;
  }
};

export default productReducer;
