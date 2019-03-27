import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import waypointsReducer from '../reducers/waypointsReducer';
import bearingReducer from '../reducers/bearingReducer';
import positionReducer from '../reducers/positionReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers(
      {
        auth: authReducer,
        waypoints: waypointsReducer,
        bearing: bearingReducer,
        currentPlanePosition: positionReducer
      }
    ),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
