import React from 'react';
import { connect } from 'react-redux';
import FlightTrackerPage from './FlightTrackerPage';
import { startAddWaypoints } from '../actions/waypointsActions';
import data from '../tests/fixtures/statusTray';

const initialZoomLevel = 6;
export class FlightInfo extends React.Component {
  state = {
    currentZoomLevel: initialZoomLevel
  }
  componentDidMount(prevProps, prevState) {
    // setTimeout(() => {
    //   this.props.startAddWaypoints(
    //     this.props.initialPlanePosition,
    //     this.props.newPlanePosition
    //   );
    // }, 1000);
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
    setTimeout(() => {
      this.props.startAddWaypoints(
        this.props.position,
        this.props.newPlanePosition
      );
    }, 1000);
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
    // TODO clear localStoarge
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
    Response
  } = data || {};

  const {
    flightInfo
  } = Response || {};

  const { 
    departureAirportLatitude = 0,
    departureAirportLongitude = 0,
    destinationAirportLatitude = 0,
    destinationAirportLongitude = 0,
    latitude = 0,
    longitude = 0
  } = flightInfo || {};

  return ({
    initialPlanePosition: [departureAirportLatitude, departureAirportLongitude],
    waypoints: state.waypoints,
    bearing: state.bearing,
    position: state.currentPlanePosition[0] === 0 ?
      [departureAirportLatitude, departureAirportLongitude] : state.currentPlanePosition,
    newPlanePosition: [latitude, longitude],
    airportOrigin: [departureAirportLatitude, departureAirportLongitude],
    airportDestination: [destinationAirportLatitude, destinationAirportLongitude]
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddWaypoints: (...waypoints) => dispatch(startAddWaypoints(...waypoints))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightInfo);
