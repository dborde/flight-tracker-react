import React from 'react';
import { connect } from 'react-redux';
import FlightTrackerPage from './FlightTrackerPage';

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

// const store = {
//   waypoints: [
//     [{
//       lat: 42.123,
//       lng: -103.123
//     }],
//     [{
//       lat: 42.123,
//       lng: -103.123
//     }],
//     [{
//       lat: 42.123,
//       lng: -103.123
//     }]
//   ],
//   currentZoomLevel: 6,
//   mapCenter: [{
//     lat: 42.123,
//     lng: -103.123
//   }],
//   initialRotationAngle: 90,
//   markers: [],
//   currentPlanePosition: [{
//     lat: 42.123,
//     lng: -103.123
//   }],
//   currentMapCenter: [{
//     lat: 42.123,
//     lng: -103.123
//   }],
//   currentRotationAngle: 0
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

export default class FlightInfo extends React.Component {
  state = {
    options: 'some option',
    value: 0,
    currentZoomLevel: initialZoomLevel
  }
  increment = () => {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  }
  componentDidMount(prevProps, prevState) {
    this.setState(() => ({
      value: 1,
      currentZoomLevel: 5
    }));
    // this.setState({ currentZoomLevel: initialZoomLevel });
    setTimeout(() => {
      this.setState({ currentZoomLevel: 6 });
      this.setState({ options: 'another option' });
      this.increment();
    }, 5000);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevState');
    console.log(prevState);
    console.log(prevState.value);
    console.log('prevProps');
    console.log(prevProps);
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
