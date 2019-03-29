// Waypoints Reducer
const waypointsReducerDefaultState = [];

export default (state = waypointsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_WAYPOINTS':
      return [
        ...state,
        action.waypoints
      ];
    default:
      return state;
  }
};
