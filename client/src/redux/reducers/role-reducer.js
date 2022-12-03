const roleReducer = (action, state = []) => {
  switch (action.type) {
    case 'ADD_ROLE':
      return [...state, action.role];
    case 'DELETE_ROLE':
      return state.filter(({ _id }) => _id !== action._id);
    case 'SET_ROLES':
      return action.roles;

    case 'EDIT_ROLE':
      return state.map((role) => {
        if (role._id === action.role._id) {
          return {
            ...role,
            ...action.role,
          };
        }
        return role;
      });

    default:
      return state;
  }
};

export default roleReducer;
