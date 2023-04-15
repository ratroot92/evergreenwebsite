import APP_ACTIONS from '../constants/actions';

const initialState = {
  stats: {},
};
const adminReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case APP_ACTIONS.ADMIN_ACTIONS.SET_DASHBOARD_STATS:
      return { ...state, stats: action.payload };
    default:
      return state;
  }
};

export default adminReducer;
