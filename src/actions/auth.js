import moment from 'moment';
import { firebase, googleAuthProvider } from '../firebase/firebase';
import { removeWaypoints } from '../actions/waypointsActions';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  const loginDate = moment();
  localStorage.setItem('loginDate', loginDate);
  return (dispatch) => {
    dispatch(removeWaypoints());
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
