import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { connect } from 'react-redux';

const LineChart = (props) => {
  const [chartData, setChartData] = useState({});
  const [data, setData] = useState({
    name: [],
    total: [],
  });

  useEffect(() => {
    var token = localStorage.getItem('access_token');
    async function fetchDataLineChart() {
      const requestProduct = await axios
        .get(props.base_url + 'total-registered-customer-date', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          var name = [];
          var total = [];
          res.data.data.map((item) => {
            name.push(item.name);
            total.push(item.total);
          });

          setData({
            ['name']: name,
            ['total']: total,
          });
        })
        .catch((e) => {
          if (e.response) {
            console.log(e.response);
          } else if (e.request) {
            console.log('request : ' + e.request);
          } else {
            console.log('message : ' + e.message);
          }
        });
      return requestProduct;
    }
    fetchDataLineChart();
  }, []);

  useEffect(() => {
    var ctx = document.getElementById('canvas').getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 122, 255, 0.33)');
    gradient.addColorStop(1, '#FFFFFF');

    const newData = {
      labels: data.name,
      datasets: [
        {
          data: data.total,
          fill: false,
          backgroundColor: gradient,
          borderColor: '#007AFF',
          tension: 0.4,
          fill: true,
        },
      ],
    };

    return setChartData(newData);
  }, [data]);

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
    />
  );
};

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(LineChart);
