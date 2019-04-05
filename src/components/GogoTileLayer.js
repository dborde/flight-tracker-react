import React from 'react';
import L from 'leaflet';
import { withLeaflet, TileLayer } from 'react-leaflet';
import { padStart } from 'lodash';
import config from '../json/flightMap';


export default withLeaflet(GogoTileLayer);
