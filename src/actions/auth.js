import moment from 'moment';
import { firebase, googleAuthProvider } from '../firebase/firebase';
import { removeWaypoints } from '../actions/waypointsActions';
// import { startGetStatusTray } from '../actions/statusTrayActions';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  const loginDate = moment();
  localStorage.setItem('loginDate', loginDate);
  // localStorage.removeItem('waypoints');
  // localStorage.removeItem('position');
  // localStorage.removeItem('bearing');
  return (dispatch) => {
    dispatch(removeWaypoints());
    // TODO we will need basic flight info before flightTracker is launched.
    // dispatch(startGetStatusTray(1));
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
