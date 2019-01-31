// import React from 'react';
import React, { PropTypes } from 'react';
// import uuid from 'uuid';
import { connect } from 'react-redux';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import { AddMarker } from './AddMarker';
import 'leaflet-arc';

// initial zoom level will be the tightest zoom level
// that includes orig and dest markers on the map
const zoomLevel = 4;
// initial mapCenter will be the current lat lng of the plane when app is ready
const mapCenter = [
  41.9741,
  -87.9073
];
const wayPoints = [
  [41.97684819454686, -87.91122436523439],
  [42.48830197960227, -91.142578125],
  [42.48830197960227, -94.74609375000001],
  [42.553080288955826, -99.40429687500001],
  [42.16340342422403, -103.97460937500001],
  [42.09822241118974, -114.60937500000001],
  [40.74725696280421, -117.59765625000001],
  [39.774769485295465, -119.97070312500001],
  [38.65119833229951, -121.81640625000001],
  [37.85750715625203, -122.65136718750001],
  [37.78808138412046, -122.4755859375]
];
// let options = {
//   departureLat: 41.97684819454686,
//   departureLng: -87.91122436523439,
//   destinationLat: 37.78808138412046,
//   destinationLng: -122.4755859375,
//   currentLat: 42.48830197960227,
//   currentLng: -94.74609375000001,
//   previousLat: 42.48830197960227,
//   previousLng: -91.142578125
// };
// let {
//   departureLat,
//   departureLng,
//   destinationLat,
//   destinationLng,
//   currentLat,
//   currentLng,
//   previousLat,
//   previousLng
// } = options;

export class FlightTrackerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waypoints: {
        idx: '',
        lat: 0,
        lng: 0
      },
      markers: [],
      planePath: [],
      currentZoomLevel: zoomLevel
    };
  }

  addMarker = (e) => {
    const {
      markers
    } = this.state;
    // planePath.push([e.latlng.lat, e.latlng.lng]);
    // this.setState({ planePath });
    markers.push(e.latlng);
    this.setState({ markers });
    console.log(this.state);
  }
  addWaypoint = (e) => {
    const {
      planePath
    } = this.state;
    planePath.push([e.latlng.lat, e.latlng.lng]);
    this.setState({ planePath });
    console.log(this.state);
  }
  componentDidMount() {
    let data;
    let data2;
    let data3;
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
      window.console.log('Current zoom level -> ', leafletMap.getZoom());
      window.console.log('this.state.zoom ->', this.state.currentZoomLevel);
    });
    const {
      planePath
    } = this.state;
    setTimeout(() => {
      data = L.Polyline.Arc([41.97684819454686, -87.91122436523439], [42.553080288955826, -99.40429687500001], { vertices: 200, offset: 100 });
      this.setState({ planePath: data._latlngs });
    }, 1000);
    setTimeout(() => {
      data2 = L.Polyline.Arc([42.553080288955826, -99.40429687500001], [42.09822241118974, -114.60937500000001], { vertices: 200, offset: 100 });
      data2._latlngs.forEach((x) => data._latlngs.push(x));
      // this.state.planePath.push(data2._latlngs);
      this.setState({ planePath: data._latlngs });
    }, 5000);
    setTimeout(() => {
      data3 = L.Polyline.Arc([42.09822241118974, -114.60937500000001], [37.78808138412046, -122.4755859375], { vertices: 200, offset: 100 });
      data3._latlngs.forEach((x) => data._latlngs.push(x));
      this.setState({ planePath: data._latlngs });
    }, 10000);
  }
  handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
  }
  render() {
    return (
      <div>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={mapCenter}
          onClick={this.addMarker}
          // initial zoom level will be the tightest zoom level
          // that includes orig and dest markers on the map
          zoom={this.state.currentZoomLevel}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <AddMarker
            position={this.state.markers}
          />
          <Polyline
            color="blue"
            onClick={this.addWaypoint}
            // positions={[this.state.planePath]}
            positions={[this.state.planePath]}
          />
        </Map>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({

});

// FlightTrackerPage.propTypes = {
//   departureLat: PropTypes.number,
//   departureLng: PropTypes.number,
//   departureLat: PropTypes.number,
//   destinationLng: PropTypes.number,
//   currentLat: PropTypes.number,
//   currentLng: PropTypes.number,
//   previousLat: PropTypes.number,
//   previousLng: PropTypes.number
// };
// FlightTrackerPage.propTypes = {
//   name: PropTypes.string
// };


export default connect(undefined, mapDispatchToProps)(FlightTrackerPage);
