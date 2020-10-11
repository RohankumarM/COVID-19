import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

function LineGraph({ country, casesType, ...props }) {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newData = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        }
        chartData.push(newData);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const url = country === 'worldwide' ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
      : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;

    const fetchData = async () => {
      await fetch(url)
        .then((response => response.json()))
        .then(data => {
          if (country === 'worldwide') {
            const chartData = buildChartData(data, casesType);
            setData(chartData);
          }
          else {
            const chartData = buildChartData(data.timeline, casesType);
            setData(chartData);
          }

        })
    }
    fetchData();
  }, [casesType, country]);

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,-0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: "MM/DD/YYYY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line data={{
          datasets: [{
            data: data,
            backgroundColor: "rgba(72, 201, 176 , 0.5)",
            borderColor: "#3498DB",
          }],
        }} options={options}></Line>
      )}
    </div>
  )
}

export default LineGraph;
