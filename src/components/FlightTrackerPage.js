import React from 'react';
import L from 'leaflet';
import 'leaflet-arc';
import { Map, Marker, TileLayer, Polyline } from 'react-leaflet';
// import React, { PropTypes } from 'react';
// import uuid from 'uuid';
import { connect } from 'react-redux';
import { AddMarker } from './AddMarker';
import RotatedMarker from './RotatedMarker';
// import flightInfo from './FlightInfo';

const airplane = new L.Icon({
  className: 'leaflet-airplane',
  iconUrl: 'images/airplane.svg',
  iconAnchor: [19, 19],
  popupAnchor: [-3, -76],
  iconSize: [38, 38],
  zIndexOffset: 10
});

const airportOrigin = new L.Icon({
  className: 'leaflet-airport-origin',
  iconUrl: 'images/airport-origin.svg',
  iconAnchor: [14, 40],
  popupAnchor: [10, -44],
  iconSize: [25, 55]
});

const airportDestination = new L.Icon({
  className: 'leaflet-airport-destination',
  iconUrl: 'images/airport-destination.svg',
  iconAnchor: [14, 40],
  popupAnchor: [10, -44],
  iconSize: [25, 55]
});

// initial zoom level will be the tightest zoom level
// that includes orig and dest markers on the map
const initialZoomLevel = 6;
// initial mapCenter will be the current lat lng of the plane when app is ready
const initialMapCenter = [
  41.9741,
  -87.9073
];
// intitial plane position will be first poll to lat long when app is started
const initialPlanePosition = [
  41.97684819454686,
  -87.91122436523439
];

const initialRotationAngle = -90;

export class FlightTrackerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waypoints: [],
      markers: [],
      currentPlanePosition: initialPlanePosition,
      currentZoomLevel: initialZoomLevel,
      currentMapCenter: initialMapCenter,
      currentRotationAngle: initialRotationAngle
    };
  }

  addMarker = (e) => {
    const {
      markers
    } = this.state;
    markers.push(e.latlng);
    this.setState({ markers });
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
      // window.console.log('Current zoom level -> ', leafletMap.getZoom());
      // window.console.log('this.state.zoom ->', this.state.currentZoomLevel);
    });
  }
  handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
  }
  render() {
    return (
      <div className="flight-map">
        <Map
          ref={m => { this.leafletMap = m; }}
          center={this.props.position}
          onClick={this.addMarker}
          // TODO create set method to set initial zoom level will be the tightest zoom level
          // that includes orig and dest markers on the map
          zoom={this.props.zoom}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <AddMarker
            position={this.state.markers}
          />
          <Marker className="flight-data" position={[41.97684819454686, -87.91122436523439]} icon={airportOrigin} />
          <RotatedMarker
            className="flight-data"
            position={this.props.position}
            rotationAngle={this.props.bearing}
            icon={airplane}
          />
          <Marker className="flight-data" position={[37.78808138412046, -122.4755859375]} icon={airportDestination} />
          <Polyline
            color="blue"
            positions={this.props.waypoints}
          />
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.options
  };
};

export default connect(mapStateToProps)(FlightTrackerPage);


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
