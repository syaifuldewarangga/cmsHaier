import axios from 'axios';
import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertModal from '../../alertModal/AlertModal';

const AdminProfile = (props) => {
  const [errorData, setErrorData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    birth_date: '',
    province: '',
    city: '',
    district: '',
    sub_district: '',
    postal_code: '',
    address: '',
    photo: '',
  });
  const [data, setData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    birth_date: '',
    province: '',
    city: '',
    district: '',
    sub_district: '',
    postal_code: '',
    address: '',
    photo: '',
    role: '',
    status: '',
  });
  const [dataFetchProvince, setDataFetchProvince] = useState([]);
  const [dataFetchCity, setDataFetchCity] = useState([]);
  const [dataFetchDistrict, setDataFetchDistrict] = useState([]);
  const [dataFetchSubDistrict, setDataFetchSubDistrict] = useState([]);
  const [filePreview, setFilePreview] = useState('');
  const [messageAlert, setMessageAlert] = useState({
    status: 'success',
    title: 'Success',
    subTitle: 'Your profile has been saved successfully',
  });

  var token = localStorage.getItem('access_token');

  const getProfileFromAPi = async () => {
    await axios.get(props.base_url + 'user', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        username: props.user_data.username,
      },
    })
    .then((res) => {
      setData({
        ...data,
        username: res.data.username,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
        phone: res.data.phone,
        gender: res.data.gender,
        birth_date: res.data.birth_date,
        province: res.data.province,
        city: res.data.city,
        district: res.data.district,
        sub_district: res.data.sub_district,
        postal_code: res.data.postal_code,
        address: res.data.address,
        role: res.data.roles,
        status: res.data.status,
        photo: res.data.image,
      });
      if (res.data.province !== '' || res.data.province !== undefined) {
        fetchDataCity(res.data.province);
        fetchDataDistrict(res.data.province, res.data.city)
        fetchDataSubDistrict(res.data.province, res.data.city, res.data.district)
      }
    });
  };

  async function fetchDataProvince() {
    await axios
      .get(props.base_url + 'location', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setDataFetchProvince(res.data);
      });
  }

  async function fetchDataCity(province) {
    await axios.get(props.base_url + 'location/city', {
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
  
  useEffect(() => {
    fetchDataProvince();
    getProfileFromAPi();
  }, []);

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
    } else if (e.target.ariaLabel === 'city') {
      setDataFetchSubDistrict([])
      setData({
        ...data,
        city: e.target.value,
        district: '',
        sub_district: ''
      });
      fetchDataDistrict(data.province, e.target.value)
    } else if (e.target.ariaLabel === 'district') {
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
    } else if(e.target.ariaLabel === 'phone' && data.phone.toString().slice(0,1) === '0') {
      setData({
        ...data,
        phone: '62' + e.target.value.toString().slice(1),
      });
    } else {
      setData({
        ...data,
        [e.target.ariaLabel]: e.target.value,
      });
    }
  };

  const appendErrorData = (responError) => {
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
    if (responError.location === 'address') {
      setErrorData({
        ...errorData,
        address: responError.reason,
      });
    }
  };

  const alertModal = () => {
    let alertModal = new Modal(document.getElementById('alertModal'));
    alertModal.show();
  };

  const onHideModal = () => {
    var alertModal = document.getElementById('alertModal');
    alertModal.addEventListener('hide.bs.modal', function (event) {
      window.location.reload();
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', data.username);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('gender', data.gender);
    formData.append('birth_date', data.birth_date);
    formData.append('province', data.province);
    formData.append('city', data.city);
    formData.append('district', data.district);
    formData.append('sub_district', data.sub_district);
    formData.append('postal_code', data.postal_code);
    formData.append('address', data.address);
    formData.append('roles', data.role);
    formData.append('status', data.status);

    await axios
      .put(props.base_url + 'user', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        localStorage.setItem( 'fullname', data.first_name + ' ' + data.last_name );
        if (data.photo !== '') {
          const formDataPhoto = new FormData();
          formDataPhoto.append('file', data.photo);
          formDataPhoto.append('userId', localStorage.getItem('id'));
          axios
            .post(props.base_url + 'user/image', formDataPhoto, {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            })
            .then((resImg) => {
              localStorage.setItem('photo', resImg.data[0].path);
              console.log('success update image');
            })
            .catch((errImg) => {
              console.log(errImg.response);
            });
        }
        alertModal();
        onHideModal()
      })
      .catch((err) => {
        console.log(err);
        let responError = err.response.data.errors;
        appendErrorData(responError);
      });
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
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                {/* <img src={props.image_url + data.photo[0].path} alt="file" className="img-fluid" />  */}
                {filePreview !== '' ? (
                  <div className="col-lg-12 d-flex justify-content-center mb-3">
                    <img src={filePreview} alt="file" className="img-fluid" />
                  </div>
                ) : data.photo.length !== 0 && data.photo !== undefined ? (
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
                    <div class="dropzone-wrapper">
                      <div class="dropzone-desc">
                        <span class="material-icons"> cloud_upload </span>
                        <p>Choose an image file or drag it here.</p>
                      </div>
                      <input
                        type="file"
                        name="img_logo"
                        class="dropzone"
                        onChange={onChangeData}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input
                      type="text"
                      class={`form-control ${
                        errorData.username !== '' ? 'is-invalid' : null
                      }`}
                      aria-label="username"
                      onChange={onChangeData}
                      value={data.username}
                      disabled="disabled"
                    />
                    <div className="invalid-feedback">{errorData.username}</div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div class="mb-3">
                    <label class="form-label">First Name</label>
                    <input
                      type="text"
                      class={`form-control ${
                        errorData.first_name !== '' ? 'is-invalid' : null
                      }`}
                      aria-label="first_name"
                      onChange={onChangeData}
                      value={data.first_name}
                    />
                    <div className="invalid-feedback">
                      {errorData.first_name}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div class="mb-3">
                    <label class="form-label">Last Name</label>
                    <input
                      type="text"
                      class={`form-control ${
                        errorData.last_name !== '' ? 'is-invalid' : null
                      }`}
                      aria-label="last_name"
                      onChange={onChangeData}
                      value={data.last_name}
                    />
                    <div className="invalid-feedback">
                      {errorData.last_name}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                      type="email"
                      class={`form-control ${
                        errorData.email !== '' ? 'is-invalid' : null
                      }`}
                      aria-label="email"
                      onChange={onChangeData}
                      value={data.email}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div class="mb-3">
                    <label class="form-label">Phone Number</label>
                    <input
                      type="number"
                      class={`form-control ${
                        errorData.phone !== '' ? 'is-invalid' : null
                      }`}
                      aria-label="phone"
                      onChange={onChangeData}
                      value={data.phone}
                      disabled="disabled"
                    />
                    <div className="invalid-feedback">{errorData.phone}</div>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <label class="form-label">Gender</label>
                  <select
                    class={`form-select ${
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
                  <div class="mb-3">
                    <label class="form-label">Birth Date</label>
                    <input
                      type="date"
                      class={`form-control ${
                        errorData.birth_date !== '' ? 'is-invalid' : null
                      }`}
                      value={data.birth_date}
                      aria-label="birth_date"
                      onChange={onChangeData}
                    />
                    <div className="invalid-feedback">
                      {errorData.birth_date}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <label class="form-label">Province</label>
                  <select
                    class={`form-select ${
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

                <div className="col-lg-12 mb-3">
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

                <div className="col-lg-12 mb-3">
                  <div class="mb-3">
                    <label class="form-label">Postal Code</label>
                    <input
                      type="number"
                      class={`form-control ${
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
                <div className="col-lg-12 mb-3">
                  <div class="mb-3">
                    <label class="form-label">Address</label>
                    <input
                      type="text"
                      class={`form-control ${
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
                  <Link to="/dashboard">
                    <div className="d-grid gap-2">
                      <button class="btn btn-outline-import" type="button">
                        Cancel
                      </button>
                    </div>
                  </Link>
                </div>
                <div className="d-grid gap-2 col-6">
                  <button class="btn btn-import" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AlertModal data={messageAlert} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    user_data: state.USER,
    image_url: state.URL,
  };
};

export default connect(mapStateToProps, null)(AdminProfile);
