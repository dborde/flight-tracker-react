import React from 'react';
import uuid from 'uuid';
import { Marker, Popup } from 'react-leaflet';

export const AddMarker = ({ position }) => (
  position.map(marker =>
    (
      <Marker
        key={uuid()}
        position={marker}
      >
        <Popup>
          <span>lat={marker.lat}, lng={marker.lng}</span>
        </Popup>
      </Marker>
    )
  )
);
