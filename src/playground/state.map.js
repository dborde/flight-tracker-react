
// {this.state.markers && this.state.markers.map(marker => (
//       <MapView.Marker
//         coordinate={marker.latlng}
//         title={marker.title}
//         description={marker.description}
//       />
//     ))}

// {
//   this.state.markers.map(
//     (position) =>
//       (
//         <Marker key={`marker-${uuid()}`} position={position}>
//           <Popup>
//             <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
//           </Popup>
//         </Marker>
//       )
//   )
// }

static propTypes = {
  idx: ImmutablePropTypes.string,
  item: ImmutablePropTypes.map,
  results: ImmutablePropTypes.map,
  routingCoords: PropTypes.object,
  router: PropTypes.object,
  fromLat: PropTypes.number,
  fromLon: PropTypes.number,
  toLat: PropTypes.number,
  toLon: PropTypes.number,
}

this.state = {
  position: [],
  routingActive: false,
  fromLat: null,
  fromLon: null,
  toLat: null,
  toLon: null,
  itinerary: undefined,
};

// Simple Counter
// const cnt = ((x) => {
//   var counter = 0;
//   return (x) => {
//     counter += x + 1;
//     return counter
//   }
// })();
// alert(cnt(4));


let {
  waypoints
} = this.state;
waypoints = Object.assign({ [uuid()]: e.latlng }, waypoints);
this.setState({ waypoints });

// function connectTheDots(data) {
//   var c = [];
//   for(i in data._layers) {
//       var x = data._layers[i]._latlng.lat;
//       var y = data._layers[i]._latlng.lng;
//       c.push([x, y]);
//   }
//   return c;
}