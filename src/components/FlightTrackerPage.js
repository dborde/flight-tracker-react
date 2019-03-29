import React from 'react';
import L from 'leaflet';
import 'leaflet-arc';
import { Map, Marker, TileLayer, Polyline } from 'react-leaflet';
// import React, { PropTypes } from 'react';
// import uuid from 'uuid';
import { connect } from 'react-redux';
import { AddMarker } from './AddMarker';
import { SetBounds } from './SetBounds';
import { SetZoom } from './SetZoom';
import RotatedMarker from './RotatedMarker';

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

export class FlightTrackerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
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
          zoom={this.props.zoom}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <AddMarker
            position={this.state.markers}
          />
          <SetBounds
            map={this.leafletMap}
            orig={this.props.airportOrigin}
            dest={this.props.airportDestination}
          />
          <SetZoom
            map={this.leafletMap}
            position={this.props.position}
            zoom={8}
          />
          <Marker className="flight-data" position={this.props.airportOrigin} icon={airportOrigin} />
          <RotatedMarker
            className="flight-data"
            position={this.props.position}
            rotationAngle={this.props.bearing}
            icon={airplane}
          />
          <Marker className="flight-data" position={this.props.airportDestination} icon={airportDestination} />
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
