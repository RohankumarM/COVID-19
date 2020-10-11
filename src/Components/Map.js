import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, GeoJSON, TileLayer, Circle, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import '../styles/Map.css';
import numeral from 'numeral';
import mapData from '../data/countries.json';
import { casesTypeColor } from '../colorType';
import LoadCountriesTask from '../Tasks/LoadCountriesTask';
import Loading from '../Loading';
import Legend from '../Legend';

function Map(props) {

  const [countries, setCountries] = useState([]);

  const mapStyle = {
    fillColor: "white",
    weight: 1, 
    color: "#333",
    fillOpacity: 1,
  };

  const load = () => {
    const loadCountriesTask = new LoadCountriesTask();
    loadCountriesTask.load((countries) => setCountries(countries));
  };

  useEffect(load, []);

  const onEachCountry = (country, layer) => {
    if(country.properties){
      layer.options.fillColor = country.properties.color;
    const name = country.properties.ADMIN;
    const confirmedText = country.properties.confirmedText;
    layer.bindPopup(`${name} ${confirmedText}`);
    }
    else{
      console.log("inside eachcountry");
    }
    
    
  };

  const showDataOnMap = (data, casesType = 'cases') =>
    data.map((country, index) => (
      <Circle
        key={index}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColor[casesType].rgb}
        fillColor={casesTypeColor[casesType].rgb}
        radius={Math.sqrt(country[casesType]) * casesTypeColor[casesType].multiplier} >

        <Popup>
          <div className="info-container">
            <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
            <div className="info-active">Active Cases: {numeral(country.active).format("0,0")}</div>
            <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
            <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
          </div>
        </Popup>
      </Circle>
    ));

  return (
    <div className="map">
      { countries.length === 0 ? <Loading /> :
      <LeafletMap center={props.center} zoom={props.zoom} worldCopyJump="true" >
        <GeoJSON style={mapStyle} onEachFeature={onEachCountry} data={mapData.features} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {showDataOnMap(props.countries, props.casesType)}
      </LeafletMap>
}
<Legend />
    </div>
  )
}

export default Map;
