import React from 'react';
import { Map, Marker, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { padStart, get } from 'lodash';
// import React, { PropTypes } from 'react';
// import uuid from 'uuid';
import { connect } from 'react-redux';
import { AddMarker } from './AddMarker';
import { SetBounds } from './SetBounds';
import { SetZoom } from './SetZoom';
import RemoveWaypointBtn from './RemoveWaypointBtn';
import RotatedMarker from './RotatedMarker';
import config from '../json/flightMap';

const correctEdges = (zoom, column) => {
  const maxValues = {
    0: 0,
    1: 1,
    2: 3,
    3: 7,
    4: 15,
    5: 31,
    6: 63,
    7: 127,
    8: 255
  }
  const max = maxValues[zoom];
  if (column > max) return (column % max) === 0 ? (column % max) : (column % max) - 1;
  if (column < 0) return Math.abs(column);
  return column;
};

const {
  flightMap
} = config || {};
const {
  groundTileUrl,
  baseLayer = {},
  localeMap = {},
  layers = [{}]
} = flightMap || {};
const {
  name,
  folderPath,
  maxZoom = 8,
  tileSize = 512,
  imgType
} = baseLayer || {};

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

const wgs84 = L.extend({}, L.CRS.EPSG4326, {
  transformation: new L.Transformation(1 / 179.7, 1, -1 / 179.7, 0.5)
});
const bounds = new L.LatLngBounds(new L.LatLng(-90.0, -179.7), new L.LatLng(90.0, 179.7));
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
    L.TileLayer.Gogo = L.TileLayer.extend({
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      getTileUrl({
        x,
        y,
        z
      }) {
        if (y < 0) {
          y = 0;
        }
        const _x = `C${padStart(correctEdges(z, x).toString(16), 8, '0')}`;
        const _y = `R${padStart(y.toString(16), 8, '0')}`;
        const _z = `L${padStart(z.toString(10), 2, '0')}`;
        return `http://maps.cloud.gogoair.com/maps/ft4/${this.options.path}/${_z}/${_y}/${_x}.${this.options.imgType}`;
      }
    });
    L.tileLayer.gogo = () => {
      return new L.TileLayer.Gogo('Map', baseLayer);
    };
    L.tileLayer.gogo().addTo(leafletMap);
    // const layerNames = layers
    //   .map((layer) => layer.name);


    // const displayLayers = ['countryborders', get(localeMap, 'en-US')];

    // layerNames.forEach((name) => {
    //   if (displayLayers.indexOf(name) > -1) {
    //     L.TileLayer[name]().addTo(leafletMap);
    //   }
    // });
    // L.tileLayer.gogo().addTo(leafletMap);
    leafletMap.setMaxBounds(bounds);
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
          crs={wgs84}
          worldCopyJump={true}
          maxZoom={7}
          bounds={bounds}
        >
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
          />
          <RemoveWaypointBtn
            waypoints={this.props.waypoints}
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
