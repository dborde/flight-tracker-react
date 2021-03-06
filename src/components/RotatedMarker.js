import React from 'react';
import { withLeaflet, Marker } from 'react-leaflet';
import 'leaflet-rotatedmarker';

const RotatedMarker = props => {
  const setupMarker = marker => {
    if (marker) {
      if (props.rotationAngle) {
        marker.leafletElement.setRotationAngle(props.rotationAngle);
        marker.leafletElement.setRotationOrigin(props.rotationOrigin);
      }
    }
  };

  return <Marker ref={el => setupMarker(el)} {...props} />;
};

RotatedMarker.defaultProps = {
  rotationOrigin: 'center'
};

export default withLeaflet(RotatedMarker);
