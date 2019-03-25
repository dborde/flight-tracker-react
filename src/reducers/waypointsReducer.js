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

// calcBearing

// store.dispatch(getCenter(x));

// const initialMapCenter = [
//   41.9741,
//   -87.9073
// ];

// START_GET_BEARING
// const calcBearing = (point, dest) => {
//   const d2r = Math.PI / 180;
//   const r2d = 180 / Math.PI;
//   const lat1 = point.lat * d2r;
//   const lat2 = dest.lat * d2r;
//   const dLon = (dest.lng - point.lng) * d2r;
//   const y = Math.sin(dLon) * Math.cos(lat2);
//   const x = (Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon));
//   let brng = Math.atan2(y, x);
//   brng = parseInt(brng * r2d, 10);
//   brng = (brng + 360) % 360;
//   return brng;
// };