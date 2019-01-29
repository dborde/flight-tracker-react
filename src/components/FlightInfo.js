import React from 'react';
import { connect } from 'react-redux';
import FlightTrackerPage from '../components/FlightTrackerPage';

const options = {
  departureLat: 41.97684819454686,
  departureLng: -87.91122436523439,
  destinationLat: 37.78808138412046,
  destinationLng: -122.4755859375,
  currentLat: 42.48830197960227,
  currentLng: -94.74609375000001,
  previousLat: 42.48830197960227,
  previousLng: -91.142578125
};

export const FlightInfo = () => {
  return (
    <div className="flight-data">
      <FlightTrackerPage
        options={options}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(FlightInfo);
