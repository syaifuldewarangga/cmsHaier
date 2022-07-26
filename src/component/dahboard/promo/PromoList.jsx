import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PromoList.css';
import PromoDataList from './PromoDataList';
import axios from 'axios';
import { connect } from 'react-redux';
import Pagination from '../../pagination/Pagination';
import ModalDelete from '../../modalDelete/ModalDelete';
import { Modal } from 'bootstrap';
import { permissionCek } from '../../../action/permissionCek';
import FormImportPromo from '../serviceCenter/promoServiceCenter/FormImportPromo';

function PromoList(props) {
  const [dataID, setDataID] = useState('')
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    tempSearch: '',
    search: '',
    isSearch: false,
    dataSearch: [],
  });
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)


  async function fetchData() {
    var token = localStorage.getItem('access_token');
    const request = await axios
      .get(props.base_url + 'extended-warranty-promo', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page: currentPage,
          itemPerPage: 10,
        }
      })
      .then((res) => {
        console.log(res.data)
        setData(res.data.content);
        setCurrentPage(res.data.number)
        setTotalPage(res.data.totalPages)
      })

      // .catch((e) => {
      //   if (e.response) {
      //     console.log(e.response);
      //   } else if (e.request) {
      //     console.log('request : ' + e.request);
      //   } else {
      //     console.log('message : ' + e.message);
      //   }
      // });
    return request;
  }

  React.useEffect(() => {
    fetchData();
  }, [currentPage]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        setState({
          ...state,
          ['search']: state.tempSearch,
        }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [state.tempSearch]);

  React.useEffect(() => { 
    const fetchAPI = async () => {
      var token = localStorage.getItem('access_token');
      const request = await axios
        .get(props.base_url + 'extended-warranty-promo/search', {
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
            ['dataSearch']: res.data.content,
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

  const handleModalDelete = (dataID) => {
    console.log(dataID)
    setDataID(dataID)
    let alertModal = new Modal(document.getElementById('modalDelete'));
    alertModal.show();
  }

  const hideModal = () => {
    let alertModal = Modal.getInstance(document.getElementById('modalDelete'));    
    alertModal.hide();
  }

  const handleDelete = async (dataID) => {
    var token = localStorage.getItem('access_token');
    await axios
    .delete(props.base_url + 'extended-warranty-promo', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        id: dataID,
      },
    })
    .then((res) => {
      fetchData()
      hideModal()
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
    <div className="user-list">
      <h5 className="dashboard title">Promo</h5>
      <div className="mt-5">
        <div>
          <div className="row justify-content">
            <div className="d-flex col-lg-6 col-12 mb-3">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="search"
                onChange={(e) =>
                  setState({ ...state, ['tempSearch']: e.target.value })
                }
              />
            </div>
            <div className="col-lg-6 d-flex mb-3 justify-content-lg-end">
            {
                permissionCek(props.user_permission, 'POST_WARRANTY_PROMO') ?
                <>
                  <button 
                    className="btn d-flex justify-content-center btn-add me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#formImportServiceCenter"
                  >
                    <span class="material-icons-outlined me-3"> file_upload </span>
                    <span className="fw-bold">Import</span>
                  </button>
                </> : null
              }
              {
                permissionCek(props.user_permission, 'POST_WARRANTY_PROMO') ?
                <Link to="/promo/add">
                  <button className="btn d-flex justify-content-center btn-add">
                    <span class="material-icons-outlined me-3"> add </span>
                    <span className="fw-bold">Add Promo</span>
                  </button>
                </Link> : null
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
                      permissionCek(props.user_permission, 'DELETE_WARRANTY_PROMO') === true || permissionCek(props.user_permission, 'UPDATE_USER') === true ?
                      <th>Action</th> : null
                    }
                    <th>Title</th>
                    <th>Image</th>
                    <th>Start Program</th>
                    <th>End Program</th>
                    <th>Start Purchase</th>
                    <th>End Purchase</th>
                    <th>Ex Warranty</th>
                    <th>Article Link</th>
                  </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch.map(function (item, i) {
                      return <PromoDataList remove={handleModalDelete} key={i} data={item} />;
                    })
                  : data.map(function (item, i) {
                      return <PromoDataList remove={handleModalDelete} key={i} data={item} />;
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
        
        <FormImportPromo />
        
        <ModalDelete 
          message="are you sure you want to delete this data?"
          dataID={dataID}
          remove = {handleDelete}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    user_permission: state.USER_PERMISSION
  };
};

export default connect(mapStateToProps, null)(PromoList);
