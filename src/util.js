import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';
import { casesTypeColor } from './colorType';


export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    return ((a.cases > b.cases) ? -1 : 1)
  })

  return sortedData;
}

export const prettyPrintStat = (stat) => {
  return (stat ? `+${numeral(stat).format("0.0a")}` : "+0");
};

export const showDataOnMap = (data, casesType = 'cases') =>
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