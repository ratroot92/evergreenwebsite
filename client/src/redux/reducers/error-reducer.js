/* eslint-disable  */
const SET_ERROR = 'SET_ERROR';
const CLEAR_ERRORS = 'CLEAR_ERRORS';

const errorReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ERROR:
      return [...state, action.payload];
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default errorReducer;
