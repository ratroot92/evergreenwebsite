/* eslint-disable  */
const userReducer = (state = { allUsers: [], allRoles: [] }, action = {}) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.user];
    case 'DELETE_USER':
      return state.filter(({ _id }) => _id !== action._id);
    case 'GET_ALL_USERS':
      let allUsers = action.payload;
      if (action.payload.length) {
        allUsers = action.payload.reduce((arr, user, index) => ((user.id = index), arr.push(user), arr), []);
      }
      return { ...state, allUsers };

    case 'GET_ALL_ROLES':
      let allRoles = action.payload;
      if (action.payload.length) {
        allRoles = action.payload.reduce((arr, user, index) => ((user.id = index), arr.push(user), arr), []);
      }
      return { ...state, allRoles };
    case 'EDIT_USER':
      return state.map((user) => {
        if (user._id === action.user._id) {
          return {
            ...user,
            ...action.user,
          };
        }
        return user;
      });

    default:
      return state;
  }
};

export default userReducer;
