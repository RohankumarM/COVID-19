import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

function LineGraph({ casesType, ...props }) {
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
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response => response.json()))
        .then(data => {
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        })
    }
    fetchData();
  }, [casesType]);

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
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
