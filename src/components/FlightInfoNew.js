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
const myZoomLevel = 6;
// initial mapCenter will be the current lat lng of the plane when app is ready
const myMapCenter = [
  41.9741,
  -87.9073
];
// intitial plane position will be first poll to lat long when app is started
const myPlanePosition = [
  41.97684819454686,
  -87.91122436523439
];

export default class FlightInfo extends React.Component {
  state = {
    myPlanePosition: [],
    myZoomLevel: [],
    myMapCenter: []
  }
  componentDidMount() {
    this.setState({
      myPlanePosition,
      myZoomLevel,
      myMapCenter
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  render() {
    return (
      <div className="flight-data">
        <FlightTrackerPage
          positions={this.state.myPlanePosition}
          zooms={this.state.myZoomLevel}
          centers={this.state.myMapCenter}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//   };
// };

// export default connect(mapStateToProps)(FlightInfo);
