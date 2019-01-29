import React from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// initial zoom level will be the tightest zoom level
// that includes orig and dest markers on the map
const zoomLevel = 11;
// initial mapCenter will be the current lat lng of the plane when app is ready
const mapCenter = [41.9741, -87.9073];

export class FlightTrackerPage extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 41.8836,
      lng: -87.6393,
      currentZoomLevel: zoomLevel
    };
  }
  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
      window.console.log('Current zoom level -> ', leafletMap.getZoom());
      window.console.log('this.state.zoom ->', this.state.currentZoomLevel);
    });
  }
  handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        ref={m => { this.leafletMap = m; }}
        center={mapCenter}
        // initial zoom level will be the tightest zoom level
        // that includes orig and dest markers on the map
        zoom={this.state.currentZoomLevel}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({

});

export default connect(undefined, mapDispatchToProps)(FlightTrackerPage);
