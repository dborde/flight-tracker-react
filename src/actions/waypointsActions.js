// import { createStore, combineReducers } from 'redux';
import L from 'leaflet';
import 'leaflet-arc';

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


// ADD_WAYPOINTS
export const addWaypoints = (waypoints) => ({
  type: 'ADD_WAYPOINTS',
  waypoints
});

// GET_BEARING
export const getBearing = (brng) => ({
  type: 'GET_BEARING',
  brng
});

// START_ADD_WAYPOINTS
export const startAddWaypoints = (previous, current, v = 10, o = 10) => {
  return (dispatch, getState) => {
    const data = L.Polyline.Arc(previous, current, { vertices: v, offset: o });
    const waypoints = [];
    data._latlngs.forEach((x, index) => {
      setTimeout(() => {
        waypoints.push(x);
        // const [destructureWaypoints] = waypoints;
        dispatch(addWaypoints(waypoints));
        // const bearing = calcBearing({
        //   lat: x.lat,
        //   lng: x.lng
        // }, {
        //   lat: current[0],
        //   lng: current[1]
        // });
        // // TODO fix when mid waypoint bearing returns 90 at end of update
        // if (bearing !== 90) {
        //   store.dispatch(getBearing(bearing));
        // }
        // store.dispatch(getCenter(x));
      }, 20 * index);
    });
  };
};
