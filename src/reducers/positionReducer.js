// Position Reducer
const positionReducerDefaultState = [0, 0];

export default (state = positionReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_POSITION':
      return action.currentPlanePosition;
    default:
      return state;
  }
};
