import React, { useEffect, useState } from 'react';
import RegisteredCustomerData from './registeredCustomerData/RegisteredCustomerData';
import axios from 'axios';
import { connect } from 'react-redux';
import Pagination from '../../../pagination/Pagination';

function RegisteredCustomer(props) {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    tempSearch: '',
    search: '',
    isSearch: false,
    dataSearch: [],
  });
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  var token = localStorage.getItem('access_token');

  useEffect(() => {
    async function fetchData() {
      const request = await axios
        .get(props.base_url + 'register-customer', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            page: currentPage,
            itemPerPage: 10,
          },
        })
        .then((res) => {
          setData(res.data.content);
          setCurrentPage(res.data.number)
          setTotalPage(res.data.totalPages)
        });
      return request;
    }
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        setState({
          ...state,
          ['search']: state.tempSearch,
        }),
      300
    );
    return () => clearTimeout(timeOutId);
  }, [state.tempSearch]);

  useEffect(() => {
    const fetchAPI = async () => {
      const request = await axios
        .get(props.base_url + 'register-customer/search', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            param: state.search,
          },
        })
        .then((res) => {
          setState({
            ...state,
            ['dataSearch']: res.data,
            ['isSearch']: true,
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
    if (state.search === '') {
      setState({
        ...state,
        ['isSearch']: false,
      });
    } else {
      fetchAPI();
    }
  }, [state.search]);

  const handleChangePage = (value) => {
    let newPage = value - 1
    setCurrentPage(newPage)
  }

  return (
    <div className="user-role">
      <h5 className="dashboard title">Registered Customer</h5>
      <div className="mt-5">
        <div>
          <div className="row">
            <div className="d-flex col-lg-6 col-12 mb-3">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) =>
                  setState({ ...state, ['tempSearch']: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="table-responsive">
              <table className="dashboard table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Full Name</th>
                    <th>KTP</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Age</th>
                    <th>Phone Number</th>
                    <th>Province</th>
                    <th>District</th>
                    <th>Sub District</th>
                    <th>Postal Code</th>
                    <th>Street</th>
                    <th>Registered Date</th>
                  </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch.map(function (item, i) {
                      return <RegisteredCustomerData key={i} data={item} />;
                    })
                  : data.map(function (item, i) {
                      return <RegisteredCustomerData key={i} data={item} />;
                    })}
              </table>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Pagination 
            currentPage={currentPage + 1}
            totalPage={totalPage}
            changePage = {handleChangePage}
          />
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

export default connect(mapStateToProps, null)(RegisteredCustomer);
