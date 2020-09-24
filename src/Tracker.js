import React,{ useState, useEffect }from 'react'
import './styles/Tracker.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import Infobox from './Infobox.js';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';


function Tracker() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setCenter] = useState({ lat: 17.644022, lng: 62.055706 });
  const [mapZoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => {
          return response.json();
        }).then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }));

          const sortedData = sortData(data);

          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? `https://disease.sh/v3/covid-19/all`
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        countryCode === 'worldwide' ? setCenter([17.644022, 62.055706])
          : setCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(4);
      });
  };

  return (
    <div className="tracker">
      <div className="app__left">
        <div className="app__header">
          <FormControl fullWidth={true} className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country, index) => { return <MenuItem key={index} value={country.value}>{country.name}</MenuItem> })
              }
              {/* <MenuItem value="worldwide">Worldwide</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox
            isRed
            active={casesType === 'cases'}
            onClick={e => setCasesType('cases')}
            title="Coronavirus Cases"
            noOfCases={prettyPrintStat(countryInfo.todayCases)}
            totalCases={numeral(countryInfo.cases).format(0, 0)} />

          <Infobox
            active={casesType === 'recovered'}
            onClick={e => setCasesType('recovered')}
            title="Recovered"
            noOfCases={prettyPrintStat(countryInfo.todayRecovered)}
            totalCases={numeral(countryInfo.recovered).format(0, 0)} />

          <Infobox
            isRed
            active={casesType === 'deaths'}
            onClick={e => setCasesType('deaths')}
            title="Deaths"
            noOfCases={prettyPrintStat(countryInfo.todayDeaths)}
            totalCases={numeral(countryInfo.deaths).format(0, 0)} />
        </div>

        <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType} />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Content By Country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle"> Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>

    </div>
  )
}

export default Tracker
