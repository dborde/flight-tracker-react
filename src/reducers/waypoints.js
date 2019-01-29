// Waypoints Reducer

const waypointsReducerDefaultState = [];

export default (state = waypointsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_WAYPOINT':
      return [
        ...state,
        action.waypoint
      ];
    case 'REMOVE_WAYPOINT':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_WAYPOINTS':
      return action.waypoints;
    default:
      return state;
  }
};
