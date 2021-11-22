import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleListData from './articleData/ArticleData';
import axios from 'axios';
import { connect } from 'react-redux';
import ModalDelete from '../../modalDelete/ModalDelete';
import { Modal } from 'bootstrap';
import Pagination from '../../pagination/Pagination';

function ArticleList(props) {
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

  const fetchData = async() => {
    var token = localStorage.getItem('access_token');
    const request = await axios
      .get(props.base_url + 'article', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page: currentPage,
          itemPerPage: 10
        }
      })
      .then((res) => {
        setData(res.data.content);
        setCurrentPage(res.data.number)
        setTotalPage(res.data.totalPages)
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
      var token = localStorage.getItem('access_token');
      const request = await axios
        .get(props.base_url + 'article/search', {
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

  const hideModal = () => {
    document.getElementById('modalDelete').click()
  }

  const handleChangePage = (value) => {
    let newPage = value - 1
    setCurrentPage(newPage)
  }

  const handleDelete = async (dataID) => {
    var token = localStorage.getItem('access_token');
    await axios
    .delete(props.base_url + 'article', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        slug: dataID,
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
    <div className="user-role">
      <h5 className="dashboard title">Article</h5>
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
              {/* <button class="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </div>
            <div className="col-lg-6 d-flex justify-content-lg-end mb-3">
              <Link to="/article/add">
                <button className="btn d-flex justify-content-center btn-add">
                  <span class="material-icons-outlined me-3"> add </span>
                  <span className="fw-bold">Add Article</span>
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
                    <th>Category</th>
                  </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch.map(function (item, i) {
                      return <ArticleListData 
                        key={i} 
                        data={item} 
                        remove={handleModalDelete}
                      />;
                    })
                  : data.map(function (item, i) {
                      return <ArticleListData 
                        key={i} 
                        data={item} 
                        remove={handleModalDelete}
                      />;
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
          changePage = {handleChangePage}
        />
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

export default connect(mapStateToProps, null)(ArticleList);
