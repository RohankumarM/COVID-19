import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './styles/Map.css';
import { showDataOnMap } from './util';

function Map(props) {
  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {showDataOnMap(props.countries, props.casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map;
