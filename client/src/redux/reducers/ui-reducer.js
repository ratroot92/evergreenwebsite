import APP_ACTIONS from '../constants/actions';

const initialState = {
  loading: true,
  successMessage: '',
};
const uiReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case APP_ACTIONS.UI_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case APP_ACTIONS.UI_ACTIONS.SET_NOTIFICATION:
      return { ...state, successMessage: action.payload };
    default:
      return state;
  }
};

export default uiReducer;
