import React from 'react';

const bounds = (data) => {
  if (data) {
    const leafletMap = data.map.leafletElement;
    leafletMap.fitBounds([
      [data.orig[0], data.orig[1]],
      [data.dest[0], data.dest[1]]
    ]);
  }
};

export const SetBounds = (data) => (
  <div style={{ right: '100px', top: '100px', position: 'absolute' }}>
    <button onClick={() => bounds(data)}>
      Set Route Bounds
    </button>
  </div>
);
