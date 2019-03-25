import { createStore, combineReducers } from 'redux';
import L from 'leaflet';
import 'leaflet-arc';

// Reducers
// 1. are pure functions
// 2. Never change state or actions
const routeReducerDefaultState = [];
const routeReducer = (state = routeReducerDefaultState, action = {}) => {
  switch (action.type) {
    case 'ADD_WAYPOINTS':
      return [
        ...state,
        action.waypoints
      ];
    case 'GET_BEARING':
      return [
        // ...state,
        action.bearing
      ];
    case 'GET_CENTER':
      return [
        // ...state,
        action.center
      ];
    default:
      return state;
  }
};

// START_GET_BEARING
const calcBearing = (point, dest) => {
  const d2r = Math.PI / 180;
  const r2d = 180 / Math.PI;
  const lat1 = point.lat * d2r;
  const lat2 = dest.lat * d2r;
  const dLon = (dest.lng - point.lng) * d2r;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = (Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon));
  let brng = Math.atan2(y, x);
  brng = parseInt(brng * r2d, 10);
  brng = (brng + 360) % 360;
  return brng;
};

// Store Creation
const store = createStore(
  combineReducers(
    {
      route: routeReducer
    }
  )
);

store.subscribe(() => {
  const state = store.getState();
  console.log(state.waypoints);
  console.log(state.currentRotationAngle);
  console.log('currentMapCenter');
  console.log(state.currentMapCenter);
});


// ADD_WAYPOINTS
export const addWaypoints = (waypoints) => ({
  type: 'ADD_WAYPOINTS',
  waypoints
});

// GET_BEARING
export const getBearing = (bearing) => ({
  type: 'GET_BEARING',
  bearing
});

// GET_CENTER
export const getCenter = (center) => ({
  type: 'GET_CENTER',
  center
});


// START_ADD_WAYPOINTS
const startAddWaypoints = (previous, current, v = 10, o = 10) => {
  const data = L.Polyline.Arc(previous, current, { vertices: v, offset: o });
  const waypoints = [];
  data._latlngs.forEach((x, index) => {
    setTimeout(() => {
      waypoints.push(x);
      const [destructureWaypoints] = waypoints;
      store.dispatch(addWaypoints(destructureWaypoints));
      const bearing = calcBearing({
        lat: x.lat,
        lng: x.lng
      }, {
        lat: current[0],
        lng: current[1]
      });
      // TODO fix when mid waypoint bearing returns 90 at end of update
      if (bearing !== 90) {
        store.dispatch(getBearing(bearing));
      }
      store.dispatch(getCenter(x));
    }, 20 * index);
  });
};

// listen for changes to store with store.subscribe()
// unlisten = unsubscribe();
// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });

startAddWaypoints(
  [41.97684819454686, -87.91122436523439],
  [42.553080288955826, -99.40429687500001]
);

// startAddWaypoints(
//   [42.553080288955826, -99.40429687500001],
//   [42.09822241118974, -114.60937500000001]
// );
