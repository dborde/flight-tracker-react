// Bearing Reducer
const bearingReducerDefaultState = 0;
export default (state = bearingReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_BEARING':
      return action.brng;
    default:
      return state;
  }
};
