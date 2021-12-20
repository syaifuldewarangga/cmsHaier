import React, { useEffect, useState } from 'react';
import CategoryArticleData from '../categoryArticleData/CategoryArticleData';
import FormCategoryAricle from '../formCategoryArticle/FormCategoryArticle';
import axios from 'axios';
import { connect } from 'react-redux';
import ModalDelete from '../../../modalDelete/ModalDelete';
import { Modal } from 'bootstrap';
import { permissionCek } from '../../../../action/permissionCek';

const CategoryArticle = (props) => {
  const [dataID, setDataID] = useState('')
  const [tittle, setTittle] = useState('Edit Category');
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState({
    time: '',
    isi: {},
  });
  const [state, setState] = useState({
    tempSearch: '',
    search: '',
    isSearch: false,
    dataSearch: [],
  });
  const getDataFromAPI = () => {
    var token = localStorage.getItem('access_token');
    axios.get(props.base_url + 'category', {
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
  }
  useEffect(() => {
    getDataFromAPI()
  }, [temp.time]);

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
        .get(props.base_url + 'category/search', {
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
    let alertModal = new Modal(document.getElementById('modalDelete'));
    setDataID(dataID)
    alertModal.show();
  }

  const hideModal = () => {
    document.getElementById('closeModalDelete').click()
  }

  const handleDelete = async (dataID) => {
    var date = new Date();
    const formData = new FormData();
    formData.append('id', dataID);
    var token = localStorage.getItem('access_token');
      await axios
      .delete(props.base_url + 'category', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: formData,
      })
      .then(() => {
        hideModal()
        getDataFromAPI()
        props.onChangeTime(date.getTime());
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
      <h5 className="dashboard title">Category Article</h5>
      <div className="mt-5">
        <div>
          <div className="row">
            <div className="d-flex col-lg-6 col-12 mb-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) =>
                  setState({ ...state, ['tempSearch']: e.target.value })
                }
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Searchs
              </button> */}
            </div>
            {
              permissionCek(props.user_permission, 'POST_CATEGORY') &&
              <div className="col-lg-6 d-flex justify-content-lg-end mb-3">
                <button
                  className="btn d-flex justify-content-center btn-add"
                  onClick={() => setTittle('Add Category')}
                  data-bs-toggle="modal"
                  data-bs-target="#formCategoryArticle"
                >
                  <span className="material-icons-outlined me-3"> add </span>
                  <span className="fw-bold">Add Category</span>
                </button>
              </div>
            }
          </div>
        </div>

        <div>
          <div className="card">
            <div className="table-responsive">
              <table className="dashboard table">
                <thead>
                  <tr>
                    {
                      permissionCek(props.user_permission, 'UPDATE_CATEGORY') && permissionCek(props.user_permission, 'DELETE_CATEGORY') ?
                      <th width="9%">Action</th> : null
                    }
                    <th>Category Name</th>
                  </tr>
                </thead>
                {state.isSearch === true
                  ? state.dataSearch.map(function (item, i) {
                      return (
                        <CategoryArticleData
                          onChangeIsi={(value) =>
                            setTemp({ ...temp, ['isi']: value })
                          }
                          onChangeTitle={(value) => setTittle(value)}
                          onChangeTime={(value) =>
                            setTemp({ ...temp, ['time']: value })
                          }
                          data={item}
                          key={i}
                        />
                      );
                    })
                  : data.map(function (item, i) {
                      return (
                        <CategoryArticleData
                          onChangeIsi={(value) =>
                            setTemp({ ...temp, ['isi']: value })
                          }
                          onChangeTitle={(value) => setTittle(value)}
                          onChangeTime={(value) =>
                            setTemp({ ...temp, ['time']: value })
                          }
                          data={item}
                          key={i}
                          remove={handleModalDelete}
                        />
                      );
                    })}
              </table>
            </div>
          </div>
        </div>
      </div>

      <FormCategoryAricle
        title={tittle}
        data={tittle === 'Edit Category' ? temp.isi : ''}
        onChangeTime={(value) => setTemp({ ...temp, ['time']: value })}
      />

      <ModalDelete
        message="are you sure you want to delete this data?"
        dataID={dataID}
        remove = {handleDelete}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    user_permission: state.USER_PERMISSION
  };
};

export default connect(mapStateToProps, null)(CategoryArticle);
