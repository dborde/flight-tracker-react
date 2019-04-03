import React from 'react';
import { connect } from 'react-redux';
import { removeWaypoints } from '../actions/waypointsActions';

export const RemoveWaypointBtn = ({ removeWaypoints }) => (
  <div style={{ right: '100px', top: '150px', position: 'absolute' }}>
    <button onClick={removeWaypoints}>
      Remove Waypoints
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  removeWaypoints: () => dispatch(removeWaypoints())
});

export default connect(undefined, mapDispatchToProps)(RemoveWaypointBtn);
