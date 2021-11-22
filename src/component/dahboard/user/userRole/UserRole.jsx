import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserRoleData from './userRoleData/UserRoleData';
import axios from 'axios';
import { connect } from 'react-redux';
import ModalDelete from '../../../modalDelete/ModalDelete';
import { Modal } from 'bootstrap';

function UserRole(props) {
  const [dataID, setDataID] = useState('')
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    tempSearch: '',
    search: '',
    isSearch: false,
    dataSearch: [],
  });

  const fetchData = async () => {
    var token = localStorage.getItem('access_token');
    const request = await axios
      .get(props.base_url + 'role', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setData(res.data);
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

  useEffect(() => {
    fetchData();
  }, []);

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
      var token = localStorage.getItem('access_token');
      const request = await axios
        .get(props.base_url + 'role/search', {
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

  const handleModalDelete = (dataID) => {
    setDataID(dataID)
    let alertModal = new Modal(document.getElementById('modalDelete'));
    alertModal.show();
  }  

  const hideModalDelete = () => {
    document.getElementById('closeModalDelete').click()
  }

  const handleDelete = async (dataID) => {
    var token = localStorage.getItem('access_token');
    await axios
      .delete(props.base_url + 'role', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          rolename: dataID,
        },
      })
      .then((res) => {
        // alert('Berhasil!');
        hideModalDelete()
        fetchData()
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
  }

  return (
    <div className="user-role">
      <h5 className="dashboard title">User Roles</h5>
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
              {/* <button class="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </div>
            <div className="col-lg-6 d-flex justify-content-lg-end mb-3">
              <Link to="/user-role/add">
                <button className="btn d-flex justify-content-center btn-add">
                  <span class="material-icons-outlined me-3"> add </span>
                  <span className="fw-bold">Add Role</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="table-responsive">
              <table className="dashboard table">
                <thead>
                  <tr>
                    <th width="9%">Action</th>
                    <th>User Role</th>
                  </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch.map(function (item, i) {
                      return <UserRoleData remove={handleModalDelete} key={i} data={item} />;
                    })
                  : data.map(function (item, i) {
                      return <UserRoleData remove={handleModalDelete} key={i} data={item} />;
                    })}
              </table>
            </div>
          </div>
        </div>
      </div>
      <ModalDelete 
        message="are you sure you want to delete this data?"
        dataID={dataID}
        remove = {handleDelete}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(UserRole);
