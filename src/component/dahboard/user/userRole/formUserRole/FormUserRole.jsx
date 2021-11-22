import React from 'react';
import './FormUserRole.css';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function FormUserRole(props) {
  const history = useHistory();
  const [data, setData] = React.useState({
    name: '',
    role: [],
  });

  const [errorData, setErrorData] = React.useState({
    name: '',
    checklist: '',
  });

  React.useEffect(() => {
    if (props.data !== undefined && props.data.role !== undefined) {
      setData({
        ...data,
        ['name']: props.data.role[0],
        ['role']: props.data.permission,
      });
    }
  }, [props.data]);

  const onChangeData = (e) => {
    setData({
      ...data,
      [e.target.ariaLabel]: e.target.value,
    });
  };

  const fetchApi = async () => {
    const formData = new FormData();

    formData.append('name', data.name);

    data.role.map((item, i) => {
      formData.append('permission_name', item);
    });

    var token = localStorage.getItem('access_token');
    if (props.data !== undefined && props.data.role !== undefined) {
      const request = await axios
        .put(props.base_url + 'role', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          alert('berhasil');
          history.push('/user-role');
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
    } else {
      const request = await axios
        .post(props.base_url + 'role', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          alert('berhasil');
          history.push('/user-role');
        })
        .catch((e) => {
          let responError = e.response.data.errors;
          console.log(responError);
          if (responError !== undefined && responError.location === 'name') {
            setErrorData({
              ...errorData,
              name: responError.reason,
            });
          } else {
            setErrorData({
              ...errorData,
              checklist: 'A required field or parameter hasnt been provided.',
            });
          }
        });
      return request;
    }
  };

  return (
    <div className="form-user-role">
      <h5 className="dashboard title">{props.title}</h5>
      <div className="card">
        <div className="card-body">
          <div class="mb-3 row">
            <div className="d-flex align-items-center">
              <div className="col-2">
                <label>{props.title}</label>
              </div>
              <div className="col-5">
                <input
                  type="text"
                  class="form-control"
                  class={`form-control ${ errorData.name !== '' ? 'is-invalid' : null }`}
                  aria-label="name"
                  onChange={onChangeData}
                  value={data.name}
                  disabled={props.title === 'Edit User Role' ? 'disabled' : null}
                />
                <div class="invalid-feedback">{errorData.name}</div>
              </div>
            </div>

            <div className="mt-5">
              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Menu</th>
                      <th>Read</th>
                      <th>Add</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle">
                        <div class="d-flex justify-align-items-center">
                          <span class="material-icons me-2">
                            {' '}
                            receipt_long{' '}
                          </span>
                          <span>User</span>
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value="GET_USER"
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('GET_USER'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('GET_USER') ? 'checked' : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value="POST_USER"
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('POST_USER'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('POST_USER') ? 'checked' : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'UPDATE_USER'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('UPDATE_USER'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('UPDATE_USER')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'DELETE_USER'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('DELETE_USER'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('DELETE_USER')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="align-middle">
                        <div class="d-flex justify-align-items-center">
                          <span class="material-icons me-2">
                            {' '}
                            receipt_long{' '}
                          </span>
                          <span>User Role</span>
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'GET_ROLE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('GET_ROLE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('GET_ROLE') ? 'checked' : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'POST_ROLE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('POST_ROLE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('POST_ROLE') ? 'checked' : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'UPDATE_ROLE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('UPDATE_ROLE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('UPDATE_ROLE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'DELETE_ROLE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('DELETE_ROLE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('DELETE_ROLE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="align-middle">
                        <div class="d-flex justify-align-items-center">
                          <span class="material-icons me-2">
                            {' '}
                            receipt_long{' '}
                          </span>
                          <span>Customer</span>
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'GET_REGISTER_CUSTOMER'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'GET_REGISTER_CUSTOMER'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('GET_REGISTER_CUSTOMER')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            disabled
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            disabled
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="align-middle">
                        <div class="d-flex justify-align-items-center">
                          <span class="material-icons me-2">
                            {' '}
                            receipt_long{' '}
                          </span>
                          <span>Store</span>
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'GET_STORE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('GET_STORE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('GET_STORE') ? 'checked' : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'POST_STORE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('POST_STORE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('POST_STORE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'UPDATE_STORE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('UPDATE_STORE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('UPDATE_STORE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'DELETE_STORE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('DELETE_STORE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('DELETE_STORE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="align-middle">
                        <div class="d-flex justify-align-items-center">
                          <span class="material-icons"> receipt_long </span>
                          <span>Registered Product</span>
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input me-2"
                            type="checkbox"
                            value={'GET_REGISTER_PRODUCT'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'GET_REGISTER_PRODUCT'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('GET_REGISTER_PRODUCT')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'POST_REGISTER_PRODUCT'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'POST_REGISTER_PRODUCT'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('POST_REGISTER_PRODUCT')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'UPDATE_REGISTER_PRODUCT'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'UPDATE_REGISTER_PRODUCT'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('UPDATE_REGISTER_PRODUCT')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'DELETE_REGISTER_PRODUCT'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'DELETE_REGISTER_PRODUCT'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('DELETE_REGISTER_PRODUCT')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="align-middle">
                        <div class="d-flex justify-align-items-center">
                          <span class="material-icons me-2">
                            {' '}
                            receipt_long{' '}
                          </span>
                          <span>Service Center</span>
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'GET_SERVICE_CENTER'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']:
                                    data.role.concat('GET_SERVICE_CENTER'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('GET_SERVICE_CENTER')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'POST_SERVICE_CENTER'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'POST_SERVICE_CENTER'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('POST_SERVICE_CENTER')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'UPDATE_SERVICE_CENTER'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'UPDATE_SERVICE_CENTER'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('UPDATE_SERVICE_CENTER')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'DELETE_SERVICE_CENTER'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'DELETE_SERVICE_CENTER'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('DELETE_SERVICE_CENTER')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="align-middle">
                        <div class="d-flex justify-align-items-center">
                          <span class="material-icons me-2"> description </span>
                          <span>Article</span>
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'GET_ARTICLE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('GET_ARTICLE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('GET_ARTICLE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'POST_ARTICLE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('POST_ARTICLE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('POST_ARTICLE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'UPDATE_ARTICLE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('UPDATE_ARTICLE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('UPDATE_ARTICLE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'DELETE_ARTICLE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat('DELETE_ARTICLE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('DELETE_ARTICLE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="align-middle">
                        <div class="d-flex justify-align-items-center">
                          <span class="material-icons me-2"> headset_mic </span>
                          <span>Customer Voice</span>
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'GET_CUSTOMER_VOICE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']:
                                    data.role.concat('GET_CUSTOMER_VOICE'),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('GET_CUSTOMER_VOICE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'POST_CUSTOMER_VOICE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'POST_CUSTOMER_VOICE'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('POST_CUSTOMER_VOICE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'UPDATE_CUSTOMER_VOICE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'UPDATE_CUSTOMER_VOICE'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('UPDATE_CUSTOMER_VOICE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={'DELETE_CUSTOMER_VOICE'}
                            onChange={(value) => {
                              if (value.target.checked) {
                                setData({
                                  ...data,
                                  ['role']: data.role.concat(
                                    'DELETE_CUSTOMER_VOICE'
                                  ),
                                });
                              } else {
                                setData({
                                  ...data,
                                  ['role']: data.role.filter(
                                    (e) => e !== value.target.value
                                  ),
                                });
                              }
                            }}
                            checked={
                              data.role.includes('DELETE_CUSTOMER_VOICE')
                                ? 'checked'
                                : null
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-danger" style={{ fontSize: '13px' }}>
                  {errorData.checklist}
                </div>

                <div className="d-flex justify-content-end">
                  <Link to="/user-role">
                    <button className="btn btn-danger me-3">
                      <div className="d-flex justify-align-items-center">
                        <span class="material-icons me-2"> close </span>
                        <span>Cancel</span>
                      </div>
                    </button>
                  </Link>
                  <button className="btn btn-add" onClick={fetchApi}>
                    <div className="d-flex justify-align-items-center">
                      <span class="material-icons me-2"> done_all </span>
                      <span>Save</span>
                    </div>
                  </button>
                </div>
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

export default connect(mapStateToProps, null)(FormUserRole);
