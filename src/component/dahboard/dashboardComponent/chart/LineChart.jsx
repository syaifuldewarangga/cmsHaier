import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { connect } from 'react-redux';

const LineChart = (props) => { 
  const [chartData, setChartData] = useState({});

  const setLineChartData = () => {
    const name = []
    const total = []

    props.data.map((item) => {
      name.push(item.name)
      total.push(item.total)
    })
    
    var ctx = document.getElementById('canvas').getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 122, 255, 0.33)');
    gradient.addColorStop(1, '#FFFFFF');
    const newData = {
      labels: name,
      datasets: [
        {
          data: total,
          backgroundColor: gradient,
          borderColor: '#007AFF',
          tension: 0.4,
          fill: true,
        },
      ],
    };

    setChartData(newData);
  }
  useEffect(() => {
    setLineChartData()
  }, [props.data]);

  return (
    <Line
      id="canvas"
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: 'End User Info',
            font: {
              size: 27,
            },
          },
          legend: {
            display: false,
          },
        },
      }} 
      height={100}
    />
  );
};
export default LineChart;
