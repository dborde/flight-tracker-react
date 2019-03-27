import React from 'react';
import { connect } from 'react-redux';
import FlightTrackerPage from './FlightTrackerPage';
import { startAddWaypoints } from '../actions/waypointsActions';

// const setInitialZoomLevel = (sw, ne) => {
//   const leafletMap = this.leafletMap.leafletElement;
//   // console.log(leafletMap.getBounds());
//   leafletMap.fitBounds([
//     [sw.lat, sw.lng],
//     [ne.lat, ne.lng]
//   ]);
//   // leafletMap.fitBounds([  `
//   //   [42.48830197960227, -91.142578125],
//   //   [42.553080288955826, -99.40429687500001]
//   // ]);
// };

const initialZoomLevel = 6;
// initial mapCenter will be the current lat lng of the plane when app is ready
// const myMapCenter = [
//   41.9741,
//   -87.9073
// ];
// intitial plane position will be first poll to lat long when app is started
// const myPlanePosition = [
//   41.97684819454686,
//   -87.91122436523439
// ];

export class FlightInfo extends React.Component {
  state = {
    options: 'some option',
    value: 0,
    currentZoomLevel: initialZoomLevel
  }
  componentDidMount(prevProps, prevState) {
    setTimeout(() => {
      this.props.startAddWaypoints(
        [41.97684819454686, -87.91122436523439],
        [42.553080288955826, -99.40429687500001]
      );
    }, 1000);
    setTimeout(() => {
      this.props.startAddWaypoints(
        [42.553080288955826, -99.40429687500001],
        [42.09822241118974, -114.60937500000001]
      );
    }, 5000);
    setTimeout(() => {
      this.props.startAddWaypoints(
        [42.09822241118974, -114.60937500000001],
        [37.78808138412046, -122.4755859375]
      );
    }, 10000);
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('prevState');
    // console.log(prevState);
    // console.log(prevState.value);
    // console.log('prevProps');
    // console.log(prevProps);
    // if (prevState.options.length !== this.state.options.length) {
    //   const json = JSON.stringify(this.state.options);
    //   localStorage.setItem('options', json);
    // }
  }
  render() {
    return (
      <div className="flight-data">
        <FlightTrackerPage
          zoom={this.state.currentZoomLevel}
          options={this.state.options}
          waypoints={this.props.waypoints}
          bearing={this.props.bearing}
          position={this.props.position}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  waypoints: state.waypoints,
  bearing: state.bearing,
  position: state.currentPlanePosition
});

const mapDispatchToProps = (dispatch, props) => ({
  startAddWaypoints: (...waypoints) => dispatch(startAddWaypoints(...waypoints))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightInfo);
