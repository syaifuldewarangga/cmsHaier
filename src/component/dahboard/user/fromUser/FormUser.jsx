import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function FormUser(props) {
  const history = useHistory();
  const [errorData, setErrorData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    role: '',
    email: '',
    phone: '',
    gender: '',
    birth_date: '',
    province: '',
    city: '',
    district: '',
    sub_district: '',
    postal_code: '',
    status: '',
    address: '',
  });
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    nik: '',
    phone: '',
    email: '',
    password: '',
    status: '',
    gender: '',
    birth_date: '',
    province: '',
    city: '',
    district: '',
    sub_district: '',
    postal_code: '',
    address: '',
    age: '',
    phone_office: '',
    fax: '',
    role: '',
    photo: '',
  });
  const [dataFetchProvince, setDataFetchProvince] = useState([]);
  const [dataFetchCity, setDataFetchCity] = useState([]);
  const [dataFetchDistrict, setDataFetchDistrict] = useState([]);
  const [dataFetchSubDistrict, setDataFetchSubDistrict] = useState([]);
  const [dataFetchRole, setDataFetchRole] = useState([]);
  const [filePreview, setFilePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  var token = localStorage.getItem('access_token');

  async function fetchDataProvince() {
    const request = await axios
      .get(props.base_url + 'location', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setDataFetchProvince(res.data);
      });
    return request;
  }

  async function fetchDataCity(province) {
    const request = await axios
      .get(props.base_url + 'location/city', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          prov_name: province,
        },
      })
      .then((res) => {
        setDataFetchCity(res.data);
      });
    return request;
  }

  const fetchDataDistrict = async (province, city) => {
    await axios.get(props.base_url + 'location/city/districts', {
      params: {
        prov_name: province,
        city_name: city,
      }
    })
    .then((res) => {
      setDataFetchDistrict(res.data);
    })
  }

  const fetchDataSubDistrict = async (province, city, district) => {
    await axios.get(props.base_url + 'location/city/districts/subdistricts', {
      params: {
        prov_name: province,
        city_name: city,
        dis_name: district,
      }
    })
    .then((res) => {
      setDataFetchSubDistrict(res.data);
    });
  }

  async function fetchDataRole() {
    const request = await axios
      .get(props.base_url + 'role', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setDataFetchRole(res.data);
      });
    return request;
  }

  useEffect(() => {
    if (props.data !== undefined) {
      const role = props.data.roles !== null ? props.data.roles : null;
      setData({
        ...data,
        first_name: props.data.first_name,
        last_name: props.data.last_name,
        username: props.data.username,
        role: role,
        email: props.data.email,
        phone: props.data.phone,
        gender: props.data.gender,
        province: props.data.province,
        city: props.data.city,
        district: props.data.district,
        sub_district: props.data.sub_district,
        postal_code: props.data.postal_code,
        address: props.data.address,
        birth_date: props.data.birth_date,
        photo: props.data.image,
      });
      fetchDataCity(props.data.province)
      fetchDataDistrict(props.data.province, props.data.city)
      fetchDataSubDistrict(props.data.province, props.data.city, props.data.district)
    }
    fetchDataRole()
    fetchDataProvince()
  }, [props.base_url, props.data]);

  const onChangeData = (e) => {
    if (e.target.ariaLabel === 'province') {
      setDataFetchDistrict([])
      setDataFetchSubDistrict([])
      setData({
        ...data,
        province: e.target.value,
        city: '',
        district: '',
        sub_district: ''
      });
      fetchDataCity(e.target.value);
    } else if(e.target.ariaLabel === 'city') {
      setDataFetchSubDistrict([])
      setData({
        ...data,
        city: e.target.value,
        district: '',
        sub_district: ''
      });
      fetchDataDistrict(data.province, e.target.value)
    } else if(e.target.ariaLabel === 'district') {
      setData({
        ...data,
        district: e.target.value,
        sub_district: ''
      });
      fetchDataSubDistrict(data.province, data.city, e.target.value)
    } else if (e.target.type === 'file') {
      if (e.target.files['length'] !== 0) {
        setData({
          ...data,
          photo: e.target.files[0],
        });
        setFilePreview(URL.createObjectURL(e.target.files[0]));
      }
    } else if(e.target.ariaLabel === 'phone') {
      if(data.phone.toString().slice(0,1) === '0') {
        const newPhone = '62' + e.target.value.slice(1)
        setData({
          ...data, 
          phone: newPhone
        })
      } else {
        setData({
          ...data,
          [e.target.ariaLabel]: e.target.value,
        });
      }
    } else if (e.target.ariaLabel === 'birth_date') {
      setData({
        ...data,
        birth_date: e.target.value,
      });
    } else {
      setData({
        ...data,
        [e.target.ariaLabel]: e.target.value,
      });
    }
  };

  const appendErrorData = (responError) => {
    if (responError.location === 'username') {
      setErrorData({
        ...errorData,
        username: responError.reason,
      });
    }
    if (responError.location === 'first_name') {
      setErrorData({
        ...errorData,
        first_name: responError.reason,
      });
    }
    if (responError.location === 'last_name') {
      setErrorData({
        ...errorData,
        last_name: responError.reason,
      });
    }
    if (responError.location === 'password') {
      setErrorData({
        ...errorData,
        password: responError.reason,
      });
    }
    if (responError.location === 'role') {
      setErrorData({
        ...errorData,
        role: responError.reason,
      });
    }
    if (responError.location === 'email') {
      setErrorData({
        ...errorData,
        email: responError.reason,
      });
    }
    if (responError.location === 'phone') {
      setErrorData({
        ...errorData,
        phone: responError.reason,
      });
    }
    if (responError.location === 'gender') {
      setErrorData({
        ...errorData,
        gender: responError.reason,
      });
    }
    if (responError.location === 'birth_date') {
      setErrorData({
        ...errorData,
        birth_date: responError.reason,
      });
    }
    if (responError.location === 'province') {
      setErrorData({
        ...errorData,
        province: responError.reason,
      });
    }
    if (responError.location === 'city') {
      setErrorData({
        ...errorData,
        city: responError.reason,
      });
    }
    if (responError.location === 'district') {
      setErrorData({
        ...errorData,
        district: responError.reason,
      });
    }
    if (responError.location === 'sub_district') {
      setErrorData({
        ...errorData,
        sub_district: responError.reason,
      });
    }
    if (responError.location === 'postal_code') {
      setErrorData({
        ...errorData,
        postal_code: responError.reason,
      });
    }
    if (responError.location === 'status') {
      setErrorData({
        ...errorData,
        status: responError.reason,
      });
    }
    if (responError.location === 'address') {
      setErrorData({
        ...errorData,
        address: responError.reason,
      });
    }
  };

  const fetchAPI = () => {
    setIsLoading(true)
    if(data.phone.toString().slice(0, 2) !== '62' && data.phone !== '') {
      setErrorData({
        ...errorData,
        phone: 'check your phone number, use 62 for phone number code',
      });
      setIsLoading(false)
    } else {
      let formData = new FormData();
      formData.append('username', data.username);
      formData.append('nik', data.nik);
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('status', data.status);
      formData.append('gender', data.gender);
      formData.append('birth_date', data.birth_date);
      formData.append('province', data.province);
      formData.append('city', data.city);
      formData.append('district', data.district);
      formData.append('sub_district', data.sub_district);
      formData.append('postal_code', data.postal_code);
      formData.append('address', data.address);
      formData.append('age', data.age);
      formData.append('phone_office', data.phone_office);
      formData.append('fax', data.fax);
  
      var token = localStorage.getItem('access_token');
      if (props.title === 'Edit User') {
        formData.append('roles', data.role);
        axios
          .put(props.base_url + 'user', formData, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            localStorage.setItem( 'fullname', data.first_name + ' ' + data.last_name );
            if (data.photo !== '' && data.photo !== props.data.image) {
              const formDataPhoto = new FormData();
              formDataPhoto.append('file', data.photo);
              formDataPhoto.append('userId', localStorage.getItem('id'));
              axios
                .post(props.base_url + 'user/image', formDataPhoto, {
                  headers: {
                    Authorization: 'Bearer ' + token,
                  },
                })
                .then((res) => {
                  alert('berhasil');
                  history.push('/users');
                })
                .catch((e) => {
                  // let responError = e.response.data.errors;
                  // console.log(e.response);
                });
            } else {
              alert('berhasil');
              history.push('/users');
            }
          })
          .catch((e) => {
            let responError = e.response.data.errors;
            appendErrorData(responError);
          }).finally(() => {
            setIsLoading(false)
          });
      } else {
        formData.append('role', data.role);
        axios
          .post(props.base_url + 'user/save', formData, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            if (data.photo !== '') {
              const formDataPhoto = new FormData();
              formDataPhoto.append('file', data.photo);
              formDataPhoto.append('userId', res.data.id);
              axios
                .post(props.base_url + 'user/image', formDataPhoto, {
                  headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                  },
                })
                .then((res) => {
                  alert('berhasil');
                  history.push('/users');
                })
                .catch((e) => {
                  let responError = e.response.data.errors;
                  appendErrorData(responError);
                });
            } else {
              alert('berhasil');
              history.push('/users');
            }
          })
          .catch((e) => {
            let responError = e.response.data.errors;
            // console.log(responError)
            appendErrorData(responError);
          }).finally(() => {
            setIsLoading(false)
          });
      }
    }
  };
  return (
    <div>
      <div className="form-user">
        <div className="card">
          <div className="card-header btn-import  ">
            <h5
              className="dashboard title"
              style={{ margin: '0', padding: '7px 0' }}
            >
              {props.title}
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              {filePreview !== '' ? (
                <div className="col-lg-12 d-flex justify-content-center mb-3">
                  <img src={filePreview} alt="file" className="img-fluid" />
                </div>
              ) : data.photo !== '' && data.photo !== undefined && data.photo.length !== 0 ? (
                <div className="col-lg-12 d-flex justify-content-center mb-3">
                  <img
                    src={props.image_url + data.photo[0].path}
                    alt="file"
                    className="img-fluid"
                  />
                </div>
              ) : null}
              <div className="col-lg-12 mb-3">
                <div className="btn-upload-custom">
                  <div className="dropzone-wrapper">
                    <div className="dropzone-desc">
                      <span className="material-icons"> cloud_upload </span>
                      <p>Choose an image file or drag it here.</p>
                    </div>
                    <input
                      type="file"
                      name="img_logo"
                      className="dropzone"
                      onChange={onChangeData}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errorData.username !== '' ? 'is-invalid' : null
                    }`}
                    aria-label="username"
                    onChange={onChangeData}
                    value={data.username}
                    disabled={props.title === 'Edit User' ? true : false}
                    required
                  />
                  <div className="invalid-feedback">{errorData.username}</div>
                </div>
              </div>
              {props.title === 'Edit User' ? null : (
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${
                        errorData.password !== '' ? 'is-invalid' : null
                      }`}
                      aria-label="password"
                      onChange={onChangeData}
                      required
                    />
                    <div className="invalid-feedback">{errorData.password}</div>
                  </div>
                </div>
              )}
              <div className="col-lg-6">
                <label className="form-label">Role</label>
                <select
                  className={`form-select ${
                    errorData.role !== '' ? 'is-invalid' : null
                  }`}
                  aria-label="role"
                  onChange={onChangeData}
                  required
                >
                  <option selected disabled>
                    -- Select Role --
                  </option>
                  {dataFetchRole.map(function (item, i) {
                    return (
                      <option
                        value={item.name}
                        key={i}
                        selected={data.role === item.name ? 'selected' : null}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-feedback">{errorData.role}</div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errorData.first_name !== '' ? 'is-invalid' : null
                    }`}
                    aria-label="first_name"
                    onChange={onChangeData}
                    value={data.first_name}
                    required
                  />
                  <div className="invalid-feedback">{errorData.first_name}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errorData.last_name !== '' ? 'is-invalid' : null
                    }`}
                    aria-label="last_name"
                    onChange={onChangeData}
                    value={data.last_name}
                    required
                  />
                  <div className="invalid-feedback">{errorData.last_name}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errorData.email !== '' ? 'is-invalid' : null
                    }`}
                    aria-label="email"
                    onChange={onChangeData}
                    value={data.email}
                    required
                  />
                  <div className="invalid-feedback">{errorData.email}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className={`form-control ${
                        errorData.phone !== '' ? 'is-invalid' : null
                      }`}
                      aria-label="phone"
                      onChange={onChangeData}
                      value={data.phone}
                      disabled={props.title === 'Edit User' ? 'disabled' : null}
                      required
                    />
                    <div className="invalid-feedback">{errorData.phone}</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <label className="form-label">Gender</label>
                <select
                  className={`form-select ${
                    errorData.gender !== '' ? 'is-invalid' : null
                  }`}
                  aria-label="gender"
                  onChange={onChangeData}
                >
                  <option selected disabled>
                    -- Select Gender --
                  </option>
                  <option
                    value="Pria"
                    selected={data.gender === 'Pria' ? 'selected' : null}
                  >
                    Pria
                  </option>
                  <option
                    value="Wanita"
                    selected={data.gender === 'Wanita' ? 'selected' : null}
                  >
                    Wanita
                  </option>
                </select>
                <div className="invalid-feedback">{errorData.gender}</div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="mb-3">
                  <label className="form-label">Birth Date</label>
                  <input
                    type="date"
                    className={`form-control ${
                      errorData.birth_date !== '' ? 'is-invalid' : null
                    }`}
                    value={data.birth_date}
                    aria-label="birth_date"
                    onChange={onChangeData}
                  />
                  <div className="invalid-feedback">{errorData.birth_date}</div>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <label className="form-label">Province</label>
                <select
                  className={`form-select ${
                    errorData.province !== '' ? 'is-invalid' : null
                  }`}
                  aria-label="province"
                  onChange={onChangeData}
                >
                  <option selected disabled>
                    -- Select Province --
                  </option>
                  {dataFetchProvince.map(function (item, i) {
                    return (
                      <option
                        value={item.prov_name}
                        key={i}
                        selected={
                          data.province === item.prov_name ? 'selected' : null
                        }
                      >
                        {item.prov_name}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-feedback">{errorData.province}</div>
              </div>

              <div className="col-lg-6 mb-3">
                <label class="form-label">City</label>
                <select
                  class={`form-select ${ errorData.city !== '' ? 'is-invalid' : null }`}
                  aria-label="city"
                  onChange={onChangeData}
                  disabled={dataFetchCity.length === 0 ? 'disabled' : null}
                >
                  <option selected={data.city === '' || data.city === undefined ? 'selected' : null} disabled>-- Select your city --</option>
                  {dataFetchCity.map(function (item, i) {
                    return (
                      <option
                        value={item.city_name}
                        key={i}
                        selected={
                          data.city === item.city_name ? 'selected' : null
                        }
                      >
                        {item.city_name}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-feedback">{errorData.city}</div>
              </div>

              <div className="col-lg-6 mb-3">
                  <label class="form-label">District</label>
                  <select
                    class={`form-select ${ errorData.district !== '' ? 'is-invalid' : null }`}
                    aria-label="district"
                    onChange={onChangeData}
                    disabled={dataFetchDistrict.length === 0 ? 'disabled' : null}
                  >
                    <option selected={data.district === '' || data.district === undefined ? 'selected' : null} disabled>-- Select your district --</option>
                    {dataFetchDistrict.map(function (item, i) {
                      return (
                        <option
                          value={item.dis_name}
                          key={i}
                          selected={
                            data.district === item.dis_name ? 'selected' : null
                          }
                        >
                          {item.dis_name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback">{errorData.district}</div>
              </div>

              <div className="col-lg-6 mb-3" >
                <label class="form-label">Sub District</label>
                <select
                  class={`form-select ${ errorData.sub_district !== '' ? 'is-invalid' : null }`}
                  aria-label="sub_district"
                  onChange={onChangeData}
                  disabled={dataFetchSubDistrict.length === 0 ? 'disabled' : null}
                >
                  <option selected={data.sub_district === '' || data.sub_district === undefined ? 'selected' : null} disabled>-- Select your sub district --</option>
                  {dataFetchSubDistrict.map(function (item, i) {
                    return (
                      <option
                        value={item.subdis_name}
                        key={i}
                        selected={
                          data.sub_district === item.subdis_name ? 'selected' : null
                        }
                      >
                        {item.subdis_name}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-feedback">{errorData.sub_district}</div>
              </div>

              <div className="col-lg-6 mb-3">
                <div className="mb-3">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errorData.postal_code !== '' ? 'is-invalid' : null
                    }`}
                    aria-label="postal_code"
                    onChange={onChangeData}
                    value={data.postal_code}
                  />
                  <div className="invalid-feedback">
                    {errorData.postal_code}
                  </div>
                </div>
              </div>
              <div className={`${props.title === 'Edit User' ? 'col-lg-6' : null}  mb-3`}>
                <label className="form-label">Status</label>
                <select
                  className={`form-select ${
                    errorData.status !== '' ? 'is-invalid' : null
                  }`} 
                  aria-label="status"
                  onChange={onChangeData}
                >
                  <option
                    value="aktif"
                    selected={data.status === 'aktif' ? 'selected' : null}
                  >
                    Aktif
                  </option>
                  <option
                    value="tidakAktif"
                    selected={data.status === 'tidakAktif' ? 'selected' : null}
                  >
                    Tidak Aktif
                  </option>
                </select>
                <div className="invalid-feedback">{errorData.status}</div>
              </div>
              <div className="col-lg-12 mb-3">
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errorData.address !== '' ? 'is-invalid' : null
                    }`}
                    aria-label="address"
                    onChange={onChangeData}
                    value={data.address}
                  />
                  <div className="invalid-feedback">{errorData.address}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Link to="/users">
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-import" type="button">
                      Cancel
                    </button>
                  </div>
                </Link>
              </div>
              <div className="d-grid gap-2 col-6">
                <button 
                  className="btn btn-import" 
                  type="button" 
                  disabled={isLoading && 'disabled'}
                  onClick={fetchAPI}
                >
                  {
                    isLoading ?
                    <Fragment>
                        <span class="spinner-border spinner-border-sm me-1  " role="status" aria-hidden="true"></span>
                        Loading...
                    </Fragment> :
                    props.title === 'Edit User' ? 'Save' : 'Create'
                  }
                </button>
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
    image_url: state.URL,
  };
};

export default connect(mapStateToProps, null)(FormUser);
