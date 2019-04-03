// Waypoints Reducer
const waypointsReducerDefaultState = [];

export default (state = waypointsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_WAYPOINTS':
      return [
        ...state,
        action.waypoints
      ];
    case 'REMOVE_WAYPOINTS':
      return [];
    default:
      return state;
  }
};
