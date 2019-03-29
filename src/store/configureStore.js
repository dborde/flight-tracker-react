import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import waypointsReducer from '../reducers/waypointsReducer';
import bearingReducer from '../reducers/bearingReducer';
import positionReducer from '../reducers/positionReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const initialState = { 
    waypoints: JSON.parse(localStorage.getItem('waypoints')) || [],
    bearing: JSON.parse(localStorage.getItem('bearing')) || 0,
    currentPlanePosition: JSON.parse(localStorage.getItem('position')) || [0, 0]
  };
  const store = createStore(
    combineReducers(
      {
        auth: authReducer,
        waypoints: waypointsReducer,
        bearing: bearingReducer,
        currentPlanePosition: positionReducer
      }
    ),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
