const userReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.user];
    case 'DELETE_USER':
      return state.filter(({ _id }) => _id !== action._id);
    case 'SET_USERS':
      return action.users;

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
