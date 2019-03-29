import L from 'leaflet';
import 'leaflet-arc';

const calcBearing = (point, dest) => {
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

// ADD_WAYPOINTS
export const addWaypoints = (waypoints) => ({
  type: 'ADD_WAYPOINTS',
  waypoints
});

// GET_BEARING
export const getBearing = (brng) => ({
  type: 'GET_BEARING',
  brng
});

// GET_POSITION
export const getPosition = (pos) => ({
  type: 'GET_POSITION',
  currentPlanePosition: pos
});

// START_ADD_WAYPOINTS
export const startAddWaypoints = (previous, current, v = 100, o = 10) => {
  return (dispatch, getState) => {
    const data = L.Polyline.Arc(previous, current, { vertices: v, offset: o });
    const animatePosition = () => {
      const drawnData = data._latlngs;
      let idx = 0;
      const animateLine = () => {
        let currentArray = drawnData;
        let val = currentArray.shift();
        let lastVal = current;
        idx += 1;
        if (!val) {
          drawnData.shift();
          currentArray = drawnData[0] || [];
          val = currentArray.shift();
        }
        if (!val) {
          return;
        }
        if (idx < v && val.lat !== lastVal[0] && val.lng !== lastVal[1]) {
          dispatch(addWaypoints(val));
          dispatch(getPosition([val.lat, val.lng]));
          const bearing = calcBearing({
            lat: val.lat,
            lng: val.lng
          }, {
            lat: lastVal[0],
            lng: lastVal[1]
          });
          dispatch(getBearing(bearing));
          lastVal = val;
          requestAnimationFrame(animateLine);
        }
      };
      requestAnimationFrame(animateLine);
    };
    animatePosition();
  };
};

  /*
  * startAddWaypoints = (previous, current, v = 100, o = 10)
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
