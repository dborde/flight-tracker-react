// Position Reducer
const positionReducerDefaultState = [0, 0];

export default (state = positionReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_POSITION':
      return action.currentPlanePosition;
    case 'CLEAR_POSITION':
      return [0, 0];
    default:
      return state;
  }
};
