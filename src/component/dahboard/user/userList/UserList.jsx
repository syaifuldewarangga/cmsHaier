import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserList.css';
import UserListData from './userListData/UserListData';
import axios from 'axios';
import { connect } from 'react-redux';
import Pagination from '../../../pagination/Pagination';
import ModalDelete from '../../../modalDelete/ModalDelete';
import { Modal } from 'bootstrap';

function UserList(props) {
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
      .get(props.base_url + 'users', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page: currentPage,
          itemPerPage: 10,
        }
      })
      .then((res) => {
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
        .get(props.base_url + 'user/search', {
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

  const handleModalDelete = (dataID) => {
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
    .delete(props.base_url + 'user', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        username: dataID,
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
      <h5 className="dashboard title">Users</h5>
      <div className="mt-5">
        <div>
          <div className="row">
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
            <div className="col-lg-6 d-flex justify-content-lg-end mb-3">
              <Link to="/users/add">
                <button className="btn d-flex justify-content-center btn-add">
                  <span class="material-icons-outlined me-3"> add </span>
                  <span className="fw-bold">Add User</span>
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
                    <th>Action</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Status</th>
                    <th>Fullname</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch.map(function (item, i) {
                      return <UserListData remove={handleModalDelete} key={i} data={item} />;
                    })
                  : data.map(function (item, i) {
                      return <UserListData remove={handleModalDelete} key={i} data={item} />;
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
  };
};

export default connect(mapStateToProps, null)(UserList);
