// import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_WAYPOINT
export const addWaypoint = (waypoint) => ({
  type: 'ADD_WAYPOINT',
  waypoint
});

export const startAddWaypoint = (waypointData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      lat = 51.505,
      lng = -0.09,
      timeStamp = 0
    } = waypointData;
    const waypoint = { lat, lng, timeStamp };

    return database.ref(`users/${uid}/waypoints`).push(waypoint).then((ref) => {
      dispatch(addWaypoint({
        id: ref.key,
        ...waypoint
      }));
    });
  };
};

// REMOVE_WAYPOINT
export const removeWaypoint = ({ id } = {}) => ({
  type: 'REMOVE_WAYPOINT',
  id
});

export const startRemoveWaypoint = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove()
      .then(() => {
        dispatch(removeWaypoint({ id }));
      });
  };
};

// SET_WAYPOINTS
export const setWaypoints = (waypoints) => ({
  type: 'SET_WAYPOINTS',
  waypoints
});

// START_SET_WAYPOINTS
export const startSetWaypoints = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`)
      .once('value')
      .then((snapshot) => {
        const waypoints = [];

        snapshot.forEach((childSnapshot) => {
          waypoints.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setWaypoints(waypoints));
      });
  };
};
