import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import waypointsReducer from '../reducers/waypointsReducer';
import bearingReducer from '../reducers/bearingReducer';
import positionReducer from '../reducers/positionReducer';
import statusTrayReducer from '../reducers/statusTrayReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (useStorage) => {
  let initialState = {
    waypoints: JSON.parse(localStorage.getItem('waypoints')) || [],
    bearing: JSON.parse(localStorage.getItem('bearing')) || 0,
    currentPlanePosition: JSON.parse(localStorage.getItem('position')) || [0, 0],
    statusTray: []
  };
  if (!useStorage) {
    initialState = {
      waypoints: [],
      bearing: 0,
      currentPlanePosition: [0, 0],
      statusTray: []
    };
  }

  const store = createStore(
    combineReducers(
      {
        auth: authReducer,
        waypoints: waypointsReducer,
        bearing: bearingReducer,
        currentPlanePosition: positionReducer,
        statusTray: statusTrayReducer
      }
    ),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
