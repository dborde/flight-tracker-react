// StatusTray Reducer
const statusTrayReducerDefaultState = [];

export default (state = statusTrayReducerDefaultState, action) => {
  switch (action.type) {
    case 'SUCCESS_STATUSTRAY':
      return [
        ...state,
        action.statusTray
      ];
    default:
      return state;
  }
};
