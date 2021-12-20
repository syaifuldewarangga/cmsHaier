import React, { Fragment, useEffect, useState } from 'react';
import ServiceCenterListData from './serviceCenterData/ServiceCenterListData';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'bootstrap';
import ModalDelete from '../../modalDelete/ModalDelete';
import Pagination from '../../pagination/Pagination';
import FormImportServiceCenter from './formImportServiceCenter/FormImportServiceCenter';
import ModalDeleteAllData from '../../modalDelete/ModalDeleteAllData';
import { permissionCek } from '../../../action/permissionCek';

function ServiceCenterList(props) {
  const [dataID, setDataID] = useState('');
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    tempSearch: '',
    search: '',
    isSearch: false,
    dataSearch: [],
  });
  var token = localStorage.getItem('access_token');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const fetchData = async () => {
    const request = await axios
      .get(props.base_url + 'service-center', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page: currentPage,
          itemPerPage: 10,
        },
      })
      .then((res) => {
        setData(res.data);
        setCurrentPage(res.data.number);
        setTotalPage(res.data.totalPages);
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

  useEffect(() => {
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
        .get(props.base_url + 'service-center/search', {
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

  const hideModal = () => {
    document.getElementById('closeModalDelete').click();
  };

  const handleDelete = async (dataID) => {
    const token = localStorage.getItem('access_token');
    await axios
      .delete(props.base_url + '/service-center', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          id: dataID,
        },
      })
      .then((res) => {
        fetchData();
        hideModal();
      });
  };

  const downloadCSV = async () => {
    const request = await axios
      .get(props.base_url + 'service-center/export', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        JSONToCSVConvertor(res.data, 'Service Center', true);
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

  const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    var arrData =
      typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';

    if (ShowLabel) {
      var row = '';

      for (var index in arrData[0]) {
        row += index + ',';
      }

      row = row.slice(0, -1);

      CSV += row + '\r\n';
    }

    for (var i = 0; i < arrData.length; i++) {
      var row = '';

      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      CSV += row + '\r\n';
    }

    if (CSV === '') {
      alert('Invalid data');
      return;
    }

    var fileName = 'Data_';
    fileName += ReportTitle.replace(/ /g, '_');

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    var link = document.createElement('a');
    link.href = uri;

    link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChangePage = (value) => {
    let newPage = value - 1;
    setCurrentPage(newPage);
  };

  const handleModalDeleteAll = () => {
    let alertModal = new Modal(document.getElementById('modalDeleteAll'));
    alertModal.show();
  };

  const hideModalAll = () => {
    document.getElementById('closeModalDeleteAll').click();
  };

  const deleteAllData = async () => {
    await axios.delete(props.base_url + '/service-center/all', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(() => {
      fetchData()
      hideModalAll()
    }).catch((err) => {
      console.log(err.response)
    })
  }

  return (
    <div className="service-center">
      <h5 className="dashboard title">Service Center</h5>
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
              {
                permissionCek(props.user_permission, 'POST_SERVICE_CENTER') &&
                <Fragment>
                  <button
                    className="btn d-flex justify-content-center btn-export me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#formImportServiceCenter"
                  >
                    <span class="material-icons-outlined me-3"> file_upload </span>
                    <span className="fw-bold">Import</span>
                  </button>
                  <Link to="/service-center/add">
                    <button className="btn d-flex justify-content-center btn-add me-3">
                      <span class="material-icons-outlined me-3"> add </span>
                      <span className="fw-bold">Add Service Center</span>
                    </button>
                  </Link>
                </Fragment>
              }


              <button
                className="btn d-flex justify-content-center btn-export me-3"
                onClick={downloadCSV}
              >
                <span class="material-icons-outlined me-3">
                  {' '}
                  file_download{' '}
                </span>
                <span className="fw-bold">Export</span>
              </button>

              {
                permissionCek(props.user_permission, 'DELETE_SERVICE_CENTER') &&
                <button
                  className="btn d-flex justify-content-center btn-danger"
                  onClick={handleModalDeleteAll}
                >
                  <span class="material-icons-outlined me-3">
                    {' '}
                    delete{' '}
                  </span>
                  <span className="fw-bold">Delete All</span>
                </button>
              }
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="table-responsive">
              <table className="dashboard table">
                <thead>
                  <tr>
                    {
                      permissionCek(props.user_permission, 'DELETE_SERVICE_CENTER') && permissionCek(props.user_permission, 'UPDATE_SERVICE_CENTER') ?
                      <th>Action</th> : null
                    }
                    <th>Service Center Name</th>
                    <th>Phone Office</th>
                    <th>Province</th>
                    <th>City</th>
                    <th>District</th>
                    <th>Postal Code</th>
                    <th>Address</th>
                    <th>Open Day</th>
                    <th>Close Day</th>
                    <th>Operational Hour</th>
                    <th>Latitude, Longitude</th>
                  </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch.map(function (item, i) {
                      return (
                        <ServiceCenterListData
                          remove={handleModalDelete}
                          data={item}
                          key={i}
                        />
                      );
                    })
                  : data.map((item, i) => {
                      return (
                        <ServiceCenterListData
                          remove={handleModalDelete}
                          data={item}
                          key={i}
                        />
                      );
                    })}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Pagination
          currentPage={currentPage + 1}
          totalPage={totalPage}
          changePage={handleChangePage}
        />
      </div>
      <FormImportServiceCenter />
      <ModalDelete
        message="are you sure you want to delete this data?"
        dataID={dataID}
        remove={handleDelete}
      />
      <ModalDeleteAllData
        remove={deleteAllData}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    user_permission: state.USER_PERMISSION
  };
};

export default connect(mapStateToProps, null)(ServiceCenterList);
