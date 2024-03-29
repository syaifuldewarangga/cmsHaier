import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductValidateList.css';
import ProductValidateDataList from './ProductValidateDataList';
import axios from 'axios';
import { connect } from 'react-redux';
import Pagination from '../../pagination/Pagination';
import ModalDelete from '../../modalDelete/ModalDelete';
import { Modal } from 'bootstrap';
import { permissionCek } from '../../../action/permissionCek';
import FormImportPromo from '../serviceCenter/promoServiceCenter/FormImportPromo';
import ModalConfirm from './ModalConfirm';
import { format } from 'date-fns';

function ProductValidateList(props) {
  const [dataID, setDataID] = useState('')
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    tempSearch: '',
    isSearch: false,
    dataSearch: [],
    status: 'PENDING',
    search: '',
    filter: 'SERIAL_NUMBER',
  });
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  async function fetchData() {
    var token = localStorage.getItem('access_token');
    const request = await axios
      .get(props.base_url + 'register-product', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page: currentPage,
          itemPerPage: 5,
          status: state.status,
          param: state.search,
          filter: state.filter,
        }
      })
      .then((res) => {
        // console.log(res.data.content)
        // console.log(state)
        setData(res.data.content);
        setCurrentPage(res.data.number)
        setTotalPage(res.data.totalPages)
      })

      .catch((e) => {
        if (e.response) {
          // console.log(e.response);
        } else if (e.request) {
          // console.log('request : ' + e.request);
        } else {
          // console.log('message : ' + e.message);
        }
      });
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

  // React.useEffect(() => { 
  //   const fetchAPI = async () => {
  //     var token = localStorage.getItem('access_token');
  //     const request = await axios
  //       .get(props.base_url + 'register-product/search', {
  //         headers: {
  //           Authorization: 'Bearer ' + token,
  //         },
  //         params: {
  //           param: state.search,
  //         },
  //       })
  //       .then((res) => {
  //         setState({
  //           ...state,
  //           ['dataSearch']: res.data,
  //           ['isSearch']: true,
  //         });
  //       })
  //       .catch((e) => {
  //         if (e.response) {
  //           console.log(e.response);
  //         } else if (e.request) {
  //           console.log('request : ' + e.request);
  //         } else {
  //           console.log('message : ' + e.message);
  //         }
  //       });
  //     return request;
  //   };
  //   if (state.search === '') {
  //     setState({
  //       ...state,
  //       ['isSearch']: false,
  //     });
  //   } else {
  //     fetchAPI();
  //   }
  // }, [state.search]);

  const handleChangePage = (value) => {
    let newPage = value - 1
    setCurrentPage(newPage)
  }

  const handleModalDelete = (dataID) => {
    setDataID(dataID)
    let alertModal = new Modal(document.getElementById('modalDelete'));
    alertModal.show();
  }

  const hideModal = () => {
    let alertModal = Modal.getInstance(document.getElementById('modalDelete'));    
    alertModal.hide();
  }

  const handleModalConfirm = (dataID) => {
    setDataID(dataID)
    let alertModal = new Modal(document.getElementById('modalConfirm'));
    alertModal.show();
  }

  const hideModalConfirm = () => {
    let alertModal = Modal.getInstance(document.getElementById('modalConfirm'));    
    alertModal.hide();
  }

  const handleReject = async (dataID) => {
    var token = localStorage.getItem('access_token');
    const res = await axios.patch(props.base_url + 'register-product/plain/status', {}, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            registered_product_id: dataID,
            status: 'REJECTED',
        }
    })
    // console.log(res.data)
    alert('Success Reject Registered!')
    hideModal()
    fetchData()
    // setTimeout(() => {
    //     hideModal()
    // }, 500);
  }

  const handleApprove = async (dataId) => {
    var token = localStorage.getItem('access_token');
    const res = await axios.patch(props.base_url + 'register-product/plain/status', {}, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            registered_product_id: dataId,
            status: 'APPROVED',
        }
    })
    // console.log(res.data)
    hideModal()
    fetchData()
  }

  const handleSearch = () => {
    // console.log(state)
    fetchData();
  }

  return (
    <div className="user-list">
      <h5 className="dashboard title">Product Validate</h5>
      <div className="mt-5">
        <div>
          <div className="row justify-content mb-3 gap-1">
            <div className="col-md-4">
              <input
                class="form-control flex-grow-2"
                type="search"
                placeholder="Search"
                aria-label="search"
                onChange={(e) =>
                  setState({ ...state, ['tempSearch']: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <select name='filter' value={state.filter} onChange={handleChange} className='form-control flex-grow-1'>
                <option value="SERIAL_NUMBER">Serial Number</option>
                <option value="EMAIL">Email</option>
              </select>
            </div>
            <div className="col-md-2">
              <select value={state.status} onChange={handleChange} className='form-control flex-grow-1' name="status">
                <option value="APPROVED">Approved</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div className="col-md-2">
              <button onClick={handleSearch} className='btn btn-outline-primary d-flex align-items-center gap-2'>
                <span class="material-icons-outlined md-18"> search </span>
                Search
              </button>
            </div>
            {/* <div className="col-lg-6 d-flex mb-3 justify-content-lg-end">
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
            </div> */}
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
                        <th>Barcode</th>
                        <th>Status</th>
                        <th>Promo Name</th>
                        <th>Email User</th>
                        <th>Brand</th>
                        <th>Product Model</th>
                        <th>Serial Number</th>
                        <th>Invoice</th>
                        <th>Warranty Card</th>
                        <th>Serial Number Image</th>
                    </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch?.map(function (item, i) {
                      return <ProductValidateDataList approve={handleModalConfirm} remove={handleModalDelete} key={i} data={item} />;
                    })
                  : data.map(function (item, i) {
                      return <ProductValidateDataList approve={handleModalConfirm} remove={handleModalDelete} key={i} data={item} />;
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
            message="are you sure you want to reject this product?"
            dataID={dataID}
            remove = {handleReject}
        />
        <ModalConfirm 
            fetchAPI={handleApprove} 
            message='are you sure you want to approve this product?'
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

export default connect(mapStateToProps, null)(ProductValidateList);
