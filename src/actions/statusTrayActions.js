// import data from '../tests/fixtures/statusTray01';
import axios from 'axios';

import { startAddWaypoints } from '../actions/waypointsActions';

// SUCCESS_STATUSTRAY
export const getStatusTray = (flightInfo) => ({
  type: 'SUCCESS_STATUSTRAY',
  statusTray: flightInfo
});

// // START_ADD_WAYPOINTS
// export const startGetStatusTray = () => {
//   return (dispatch, getState) => {
//     const {
//       Response
//     } = data || {};
//     const {
//       flightInfo
//     } = Response || {};
//     // const {
//     //   departureAirportLatitude = 0,
//     //   departureAirportLongitude = 0,
//     //   destinationAirportLatitude = 0,
//     //   destinationAirportLongitude = 0,
//     //   latitude = 0,
//     //   longitude = 0
//     // } = flightInfo || {};

//     dispatch(getStatusTray(flightInfo));
//   };
// };

// GET_STATUS_TRAY and START_ADD_WAYPOINTS
export const startGetStatusTray = (iteration = 1) => {
  return (dispatch, getState) => {
    axios.get('http://localhost:8080/statusTrays.json')
      .then((response) => {
        const {
          data
        } = response || {};
        const {
          flightInfo
        } = data[`Response${iteration}`] || {};
        const update = getState();
        // Temporay gps simulator
        const position = update.currentPlanePosition[0] === 0 ?
          [flightInfo.departureAirportLatitude, flightInfo.departureAirportLongitude] :
          [update.currentPlanePosition[0], update.currentPlanePosition[1]];
        dispatch(getStatusTray(flightInfo));
        dispatch(startAddWaypoints(
          position,
          [flightInfo.latitude, flightInfo.longitude]
        ));
      })
      .catch((err) => {
      });
  };
};
