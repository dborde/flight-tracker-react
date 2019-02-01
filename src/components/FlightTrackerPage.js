// import React from 'react';
import L from 'leaflet';
import 'leaflet-arc';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import React, { PropTypes } from 'react';
// import uuid from 'uuid';
import { connect } from 'react-redux';
import { AddMarker } from './AddMarker';


// initial zoom level will be the tightest zoom level
// that includes orig and dest markers on the map
const zoomLevel = 4;
// initial mapCenter will be the current lat lng of the plane when app is ready
const mapCenter = [
  41.9741,
  -87.9073
];
// const wayPoints = [
//   [41.97684819454686, -87.91122436523439],
//   [42.48830197960227, -91.142578125],
//   [42.48830197960227, -94.74609375000001],
//   [42.553080288955826, -99.40429687500001],
//   [42.16340342422403, -103.97460937500001],
//   [42.09822241118974, -114.60937500000001],
//   [40.74725696280421, -117.59765625000001],
//   [39.774769485295465, -119.97070312500001],
//   [38.65119833229951, -121.81640625000001],
//   [37.85750715625203, -122.65136718750001],
//   [37.78808138412046, -122.4755859375]
// ];
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
      waypoints: [],
      markers: [],
      // planePath: [],
      currentZoomLevel: zoomLevel
    };
  }

  addMarker = (e) => {
    const {
      markers
    } = this.state;
    markers.push(e.latlng);
    this.setState({ markers });
  }

  /*
  * The vertices 'v' argument to Arc specifies the number of intermediate
  * vertices you want in the resulting line. The higher the number
  * the more dense and accurate the line will be.
  *
  * The offset 'o' argument controls the likelyhood that lines will be split
  * which cross the dateline. The higher the number the more likely.
  * The default value is 10, which means lines within 10 degress
  * of the dateline will be split. For lines that cross and dateline
  * and are also near the poles you will likely need a higher value
  * to trigger splitting. It is unclear to me (@springmeyer) what the
  * drawbacks are of high offsets. I simply ported the code from OGR's
  * [gdal/ogr/ogrgeometryfactory.cpp](https://github.com/OSGeo/gdal/blob/master/gdal/ogr/ogrgeometryfactory.cpp)
  * and have not taken the time to fully comprehend how it works.
  */
  addWaypoints = (previous, current, v = 200, o = 10) => {
    const {
      waypoints
    } = this.state;
    const data = L.Polyline.Arc(previous, current, { vertices: v, offset: o });
    data._latlngs.forEach((x, index) => {
      // could animation of line get any simpler than this?
      setTimeout(() => {
        waypoints.push(x);
        this.setState({ waypoints });
      }, 3 * index);
    });
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
      window.console.log('Current zoom level -> ', leafletMap.getZoom());
      window.console.log('this.state.zoom ->', this.state.currentZoomLevel);
    });
    setTimeout(() => {
      this.addWaypoints(
        [41.97684819454686, -87.91122436523439],
        [42.553080288955826, -99.40429687500001]
      );
    }, 1000);
    setTimeout(() => {
      this.addWaypoints(
        [42.553080288955826, -99.40429687500001],
        [42.09822241118974, -114.60937500000001]
      );
    }, 5000);
    setTimeout(() => {
      this.addWaypoints(
        [42.09822241118974, -114.60937500000001],
        [37.78808138412046, -122.4755859375]
      );
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
          // TODO create set method to set initial zoom level will be the tightest zoom level
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
            positions={[this.state.waypoints]}
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
