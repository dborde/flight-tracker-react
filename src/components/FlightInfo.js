import React from 'react';
import { connect } from 'react-redux';
import FlightTrackerPage from './FlightTrackerPage';
import { startGetStatusTray } from '../actions/statusTrayActions';
import { removeWaypoints } from '../actions/waypointsActions';
// import { startAddWaypoints } from '../actions/waypointsActions';
// import data from '../tests/fixtures/statusTray';

const initialZoomLevel = 6;
let proceed = true;
function startTimer() {
  console.log('focus');
  proceed = true;
}

function stopTimer() {
  console.log('blur');
  proceed = false;
}

// Active
window.addEventListener('focus', startTimer);
// Inactive
window.addEventListener('blur', stopTimer);

export class FlightInfo extends React.Component {
  state = {
    currentZoomLevel: initialZoomLevel
  }
  componentDidMount(prevProps, prevState) {
    const testUpdate = this.updateFlightInfo();
    testUpdate();
    // setTimeout(() => {
    //   this.props.startGetStatusTray();
    //   // if (this.props.initialPlanePosition[0] !== 0) {
    //   //   this.props.startAddWaypoints(
    //   //     this.props.initialPlanePosition,
    //   //     this.props.newPlanePosition
    //   //   );
    //   // }
    // }, 1000);
    // setTimeout(() => {
    //   this.props.startGetStatusTray('2');
    // }, 10000);
    // setTimeout(() => {
    //   this.props.startAddWaypoints(
    //     [42.553080288955826, -99.40429687500001],
    //     [42.09822241118974, -114.60937500000001]
    //   );
    // }, 5000);
    // setTimeout(() => {
    //   this.props.startAddWaypoints(
    //     [42.09822241118974, -114.60937500000001],
    //     [37.78808138412046, -122.4755859375]
    //   );
    // }, 10000);
    // setTimeout(() => {
    //   this.props.startAddWaypoints(
    //     this.props.position,
    //     this.props.newPlanePosition
    //   );
    // }, 1000);
  }
  updateFlightInfo() {
    let counter = 1;

    const increment = () => {
      if (counter < 6) {   
        counter.toString();
        if (proceed) {
          this.props.startGetStatusTray(counter);
        }
        this.updateTimeout = setTimeout(() => {
          increment();
        }, 5000);
      } else {
        counter = 1;
        counter.toString();
        if (proceed) {
          this.props.startGetStatusTray(counter);
        }
        this.updateTimeout = setTimeout(() => {
          increment();
        }, 5000);
      }
      parseInt(counter, 10);
      counter += 1;
    };

    return increment;
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      waypoints,
      position,
      bearing
    } = prevProps;
    const waypointsStorage = JSON.stringify(waypoints);
    localStorage.setItem('waypoints', waypointsStorage);
    const positionStorage = JSON.stringify(position);
    localStorage.setItem('position', positionStorage);
    const bearingStorage = JSON.stringify(bearing);
    localStorage.setItem('bearing', bearingStorage);
  }
  componentWillUnmount() {
    console.log('unmounted');
    this.props.removeWaypoints(this.props.waypoints);
    // TODO: handle clearing localStorage if on new flight.
    // localStorage removal is currently handled in Gogo's
    // webapps-gadgets/helpers/helperFn.js
    clearTimeout(this.updateTimeout);
  }
  render() {
    return (
      <div className="flight-data">
        <FlightTrackerPage
          initialPlanePosition={this.props.initialPlanePosition}
          zoom={this.state.currentZoomLevel}
          waypoints={this.props.waypoints}
          bearing={this.props.bearing}
          newPlanePosition={this.props.newPlanePosition}
          position={this.props.position}
          airportOrigin={this.props.airportOrigin}
          airportDestination={this.props.airportDestination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    statusTray
  } = state || {};

  const {
    departureAirportLatitude = 0,
    departureAirportLongitude = 0,
    destinationAirportLatitude = 0,
    destinationAirportLongitude = 0,
    latitude = 0,
    longitude = 0
  } = statusTray[0] || {};

  return ({
    initialPlanePosition: [departureAirportLatitude, departureAirportLongitude],
    waypoints: state.waypoints,
    flightInfo: state.statusTray,
    bearing: state.bearing,
    position: state.currentPlanePosition[0] === 0 ?
      [departureAirportLatitude, departureAirportLongitude] : state.currentPlanePosition,
    newPlanePosition: [latitude, longitude],
    airportOrigin: [departureAirportLatitude, departureAirportLongitude],
    airportDestination: [destinationAirportLatitude, destinationAirportLongitude]
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  // startAddWaypoints: (...waypoints) => dispatch(startAddWaypoints(...waypoints)),
  startGetStatusTray: (iteration) => dispatch(startGetStatusTray(iteration)),
  removeWaypoints: () => dispatch(removeWaypoints())
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightInfo);
