import { createStore, combineReducers } from 'redux';
// import React from 'react';
import L from 'leaflet';
import 'leaflet-arc';
// import { Polyline } from 'react-leaflet';

// const getBearing = (point, dest) => {
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

// const addWaypoints = (previous, current, v = 100, o = 10) => {
//   const {
//     waypoints
//   } = this.state;
//   const data = L.Polyline.Arc(previous, current, { vertices: v, offset: o });
//   data._latlngs.forEach((x, index) => {
//     // could animation of line get any simpler than this?
//     setTimeout(() => {
//       waypoints.push(x);
//       this.setState({ waypoints });
//       this.setState({ currentPlanePosition: x });
//       const bearing = getBearing({
//         lat: x.lat,
//         lng: x.lng
//       }, {
//         lat: current[0],
//         lng: current[1]
//       });
//       // TODO fix when mid waypoint bearing returns 90 at end of update
//       if (bearing !== 90) {
//         this.setState({ currentRotationAngle: bearing });
//       }
//       // this.setState({ currentRotationAngle: bearing });
//       this.setState({ currentMapCenter: x });
//     }, 20 * index);
//   });
// };

// actions
const addWaypoints = (previous, current, v = 100, o = 10) => {
  const data = L.Polyline.Arc(previous, current, { vertices: v, offset: o });
  const waypoints = [];
  data._latlngs.forEach((x, index) => {
    waypoints.push(x);
  });
  return ({
    type: 'ADD_WAYPOINTS',
    waypoints
  });
};

// Reducers
// 1. are pure functions
// 2. Never change state or actions
const waypointsReducerDefaultState = [];
const waypointsReducer = (state = waypointsReducerDefaultState, action) => {
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

// const store = createStore(waypointsReducer);

// listen for changes to store with store.subscribe()
// unlisten = unsubscribe();
// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });

// Store Creation
const store = createStore(
  combineReducers(
    {
      waypoints: waypointsReducer
    }
  )
);

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

store.dispatch(addWaypoints(
  [41.97684819454686, -87.91122436523439],
  [42.553080288955826, -99.40429687500001])
);
store.dispatch(addWaypoints(
  [42.553080288955826, -99.40429687500001],
  [42.09822241118974, -114.60937500000001])
);
