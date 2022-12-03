const initialState = {
  isAuthenticated: false,
  user: null,
};
const authReducer = (state = initialState, action = {}) => {

  // console.log("==================================")
  // console.log("action.type          ==>", action.type)
  // console.log("action.payload       ==>", action.payload)
  // console.log("==================================")
  switch (action.type) {

    case 'SET_LOGIN':
      return { ...state, user: action.payload.user, isAuthenticated: action.payload.isAuthenticated };
    case 'SET_IS_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload.isAuthenticated, user: action.payload.user, }
    case 'SET_LOGOUT':
      return initialState
    default:
      return state;
  }
};

export default authReducer;
