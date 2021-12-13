import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BannerData from './BannerData/BannerDataList';
import axios from 'axios';
import { connect } from 'react-redux';
import ModalDelete from '../../modalDelete/ModalDelete';
import { Modal } from 'bootstrap';

function BannerList(props) {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    tempSearch: '',
    search: '',
    isSearch: false,
    dataSearch: [],
  });
  const [dataID, setDataID] = useState('');

  useEffect(() => {
    async function fetchData() {
      var token = localStorage.getItem('access_token');
      const request = await axios
        .get(props.base_url + 'banner', {
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
        .get(props.base_url + 'banner/search', {
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
    setDataID(dataID);
    let alertModal = new Modal(document.getElementById('modalDelete'));
    alertModal.show();
  };

  const handleDelete = async (dataID) => {
    var token = localStorage.getItem('access_token');
    await axios
      .delete(props.base_url + 'banner', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          id: dataID,
        },
      })
      .then((res) => {
        history.go(0);
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
  };

  return (
    <div className="user-role">
      <h5 className="dashboard title">Banner</h5>
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
            <div className="col-lg-6 d-flex justify-content-lg-end mb-3">
              <Link to="/banner/add">
                <button className="btn d-flex justify-content-center btn-add">
                  <span class="material-icons-outlined me-3"> add </span>
                  <span className="fw-bold">Add Banner</span>
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
                    <th>Photos</th>
                    <th>Title</th>
                    <th>Redirect URL</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch.map(function (item, i) {
                      return (
                        <BannerData
                          remove={handleModalDelete}
                          key={i}
                          data={item}
                        />
                      );
                    })
                  : data.map(function (item, i) {
                      return (
                        <BannerData
                          remove={handleModalDelete}
                          key={i}
                          data={item}
                        />
                      );
                    })}
              </table>
            </div>
          </div>
        </div>
      </div>

      <ModalDelete
        message="are you sure you want to delete this data?"
        dataID={dataID}
        remove={handleDelete}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(BannerList);
