import React, { useEffect, useState } from 'react';
import LineChart from './chart/LineChart';
import PieChart from './chart/PieChart';
import './DashboardComponent.css';
import axios from 'axios';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

function DashboardComponent(props) {

  const [totalUser, setTotalUser] = useState(0)
  const [totalProduct, setTotalProduct] = useState(0)
  const [date, setDate] = useState({
    date1: '',
    date2: '' 
  })
  const [lineChartUser, setLineChartUser] = useState([])
  const token = localStorage.getItem('access_token');

  const getUserByDate = async () => {
    await axios.get(props.base_url + 'total-registered-customer-date', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Authorization: 'Bearer ' + token,
        },
        params: {
          startDate: date.date1,
          endDate: date.date2,
        },
    })
    .then((res) => {
      setLineChartUser(res.data.data)
      setTotalUser(res.data.total)
    })
  }

  async function fetchDataProduct() {
    await axios.get(props.base_url + 'total-register-products', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setTotalProduct(res.data.data)
      })
  }

  

  useEffect(() => {
    fetchDataProduct()
    getUserByDate();
  }, []);

  const onChanged = (e) => {
    if(e.target.ariaLabel === 'date1') {
      setDate({
        ...date,
        date1: dateFormat(e.target.valueAsDate, 'yyyy/mm/dd')
      })
    } else {
      setDate({
        ...date,
        date2: dateFormat(e.target.valueAsDate, 'yyyy/mm/dd')
      })
    }
  };
  
  

  const getProductByDate = async () => {
      await axios.get(props.base_url + 'total-registered-product-date', {
        headers: {
          Authorization: 'Bearer ' + token
        },
        params: {
          startDate: date.date1,
          endDate: date.date2,
        },
      }).then((res) => {
        setTotalProduct(res.data.data)
      })
  }

  const onClicked = async () => {
    getUserByDate()
    getProductByDate()
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
                  <p className="total">{totalUser}</p>
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
                <p className="total">{totalProduct}</p>
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
                <LineChart data={lineChartUser} />
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
