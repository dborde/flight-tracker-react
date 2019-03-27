// Waypoints Reducer
const waypointsReducerDefaultState = [];
export default (state = waypointsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_WAYPOINTS':
      // TODO remove duplicate latLngs: doubly nested
      return [
        ...state,
        action.waypoints
      ];
    default:
      return state;
  }
};
