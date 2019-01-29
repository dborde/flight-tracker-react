const React = window.React;
const { Map, TileLayer, Marker, Popup } = window.ReactLeaflet;

class SimpleExample extends React.Component {
  constructor() {
    super();
    this.state = {
      markers: [[51.505, -0.09]]
    };
  }
  
  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
  }

  render() {
    return (
      <Map 
        center={[51.505, -0.09]} 
        onClick={this.addMarker}
        zoom={13} 
        >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.markers.map((position, idx) =>
          <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
        )}
      </Map>
    );
  }
}

window.ReactDOM.render(<SimpleExample />, document.getElementById('container'));