import React from 'react';
import LineChart from './chart/LineChart';
import PieChart from './chart/PieChart';
import './DashboardComponent.css';
import axios from 'axios';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

function DashboardComponent(props) {
  const [data, setData] = React.useState({
    user: '0',
    product: '0',
    date1: '0',
    date2: '0',
    lineChart: [0, 0, 0, 0, 0, 0, 0],
  });
  React.useEffect(() => {
    var token = localStorage.getItem('access_token');

    async function fetchDataProduct(user) {
      const requestProduct = await axios
        .get(props.base_url + 'total-register-products', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setData({
            ...data,
            user: user,
            product: res.data.data,
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
    async function fetchDataUser() {
      const request = await axios
        .get(props.base_url + 'total-registered-customer', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          fetchDataProduct(res.data.data);
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
      return request;
    }
    fetchDataUser();
  }, [props.base_url, props.data]);

  const onChanged = (e) => {
    e.target.ariaLabel === 'date1'
      ? setData({
          ...data,
          ['date1']: dateFormat(e.target.valueAsDate, 'yyyy/mm/dd'),
        })
      : setData({
          ...data,
          ['date2']: dateFormat(e.target.valueAsDate, 'yyyy/mm/dd'),
        });
  };
  const onClicked = async () => {
    var token = localStorage.getItem('access_token');
    const request = await axios
      .get(props.base_url + 'total-registered-customer-date', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Authorization: 'Bearer ' + token,
        },
        params: {
          startDate: data.date1,
          endDate: data.date2,
        },
      })
      .then((res) => {
        console.log(res.data)
        setData({
          ...data,
          ['lineChart']: res.data.data,
          ['user']: res.data.total,
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
    return request;
  };
  return (
    <div className="dashboard-component">
      <h5 className="title">Dashboard</h5>
      <div className="row mt-3">
        <div className="col">
          <Link to="/customer/registered-customer">
            <div className="card">
              <div className="d-flex align-items-center">
                <div className="count-icon" style={{ background: '#6CCAC9' }}>
                  <span class="icon material-icons-outlined"> group </span>
                </div>
                <div className="count text-center">
                  <p className="total">{data.user}</p>
                  <p className="description">End User Info</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col">
          <div className="card">
            <div className="d-flex align-items-center">
              <div className="count-icon" style={{ background: '#6CCAC9' }}>
                <span class="icon material-icons-outlined"> store </span>
              </div>
              <div className="count text-center">
                <p className="total">{data.product}</p>
                <p className="description">
                  Total Report of End User Prodcut Info
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-end">
        <div className="d-flex">
          <div class="mb-3 d-flex align-items-center me-3">
            <input
              type="date"
              class="form-control"
              onChange={onChanged}
              aria-label="date1"
            />
            <span className="mx-3">to</span>
            <input
              type="date"
              class="form-control"
              onChange={onChanged}
              aria-label="date2"
            />
          </div>
          <div>
            <button
              className="btn btn-search rounded-pill px-4 me-3"
              onClick={onClicked}
            >
              <span style={{ fontWeight: '600' }}>Search</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <LineChart data={data.lineChart} />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(DashboardComponent);
