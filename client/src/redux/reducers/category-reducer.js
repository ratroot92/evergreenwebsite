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
    case 'UPDATE_CATEGORY_PARTIAL': {
      return {
        ...state,
        selectedCategory: action.payload,
        allCategories: allCategories.map((cat) => {
          if (cat._id === action.payload._id) return action.payload;
          else return cat;
        }),
      };
    }
    default:
      return state;
  }
};

export default productReducer;
