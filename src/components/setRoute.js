const addWaypoints = (previous, current, v = 100, o = 10) => {
  const {
    waypoints
  } = this.state;
  const data = L.Polyline.Arc(previous, current, { vertices: v, offset: o });

  data._latlngs.forEach((x, index) => {
    // could animation of line get any simpler than this?
    setTimeout(() => {
      waypoints.push(x);
      this.setState({ waypoints });
      this.setState({ currentPlanePosition: x });
      const bearing = getBearing({
        lat: x.lat,
        lng: x.lng
      }, {
        lat: current[0],
        lng: current[1]
      });
      // TODO fix when mid waypoint bearing returns 90 at end of update
      if (bearing !== 90) {
        this.setState({ currentRotationAngle: bearing });
      }
      // this.setState({ currentRotationAngle: bearing });
      this.setState({ currentMapCenter: x });
    }, 20 * index);
  });
};

const getBearing = (point, dest) => {
  const d2r = Math.PI / 180;
  const r2d = 180 / Math.PI;
  const lat1 = point.lat * d2r;
  const lat2 = dest.lat * d2r;
  const dLon = (dest.lng - point.lng) * d2r;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = (Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon));
  let brng = Math.atan2(y, x);
  brng = parseInt(brng * r2d, 10);
  brng = (brng + 360) % 360;
  return brng;
};

const setState = () => {
  this.setState({ currentPlanePosition: x });
  this.setState({ currentRotationAngle: bearing });
  this.setState({ currentMapCenter: x });
};


setTimeout(() => {
  addWaypoints(
    [41.97684819454686, -87.91122436523439],
    [42.553080288955826, -99.40429687500001]
  );
}, 1000);

