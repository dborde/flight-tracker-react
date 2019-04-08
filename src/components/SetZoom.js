import React from 'react';

const zoom = (data) => {
  if (data) {
    const leafletMap = data.map.leafletElement;
    leafletMap.setView(data.position, data.zoom || 8);
  }
};

export const SetZoom = (data) => (
  <div style={{ right: '100px', top: '125px', position: 'absolute' }}>
    <button onClick={() => zoom(data)}>
      Zoom To Plane
    </button>
  </div>
);
