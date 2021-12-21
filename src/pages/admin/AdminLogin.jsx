import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminLogin.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { image_url } from '../../variable/GlobalVariable';

const AdminLogin = (props) => {
  const history = useHistory();
  const [data, setData] = React.useState({
    email: '',
    password: '',
    salah: false,
  });

  useEffect(() => {
    console.log(props.customer_login);
    if (props.admin_login) {
      props.history.push('/dashboard');
    }
  }, []);

  const onChangeData = (e) => {
    setData({
      ...data,
      [e.target.type]: e.target.value,
    });
  };

  const getProfile = async (token, email) => {
    await axios
      .get(props.base_url + 'user/get', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          identifier: email,
        },
      })
      .then((res) => {
        if (res.data.roles !== 'CUSTOMER') {
          localStorage.setItem('id', res.data.id);
          localStorage.setItem('role', res.data.roles);
          localStorage.setItem( 'fullname', res.data.first_name + ' ' + res.data.last_name );
          localStorage.setItem('access_token', token);
          localStorage.setItem('email', email);
          localStorage.setItem('phone', res.data.phone);
          localStorage.setItem('username', res.data.username);
          if (res.data.image.length !== 0) {
            localStorage.setItem('photo', res.data.image[0].path);
          }
          localStorage.setItem(
            'permission',
            JSON.stringify(res.data.permissions)
          );
          props.handleCustomerLogin(true);
          props.handleUser(res.data);
          history.push('/dashboard');
        } else {
          setData({
            ...data,
            salah: true,
          });
        }
      })
      .catch((e) => {
        if (e.response) {
          setData({
            ...data,
            salah: true,
          });
          console.log(e.response);
        } else if (e.request) {
          console.log('request : ' + e.request);
        } else {
          console.log('message : ' + e.message);
        }
      });
  };

  const fetchAPI = async () => {
    const formData = new FormData();
    formData.append('email', data.email + 'A');
    formData.append('password', data.password);
    setData({
      ...data,
      salah: false,
    });

    await axios
      .post(props.base_url + 'login', formData)
      .then((res) => {
        getProfile(res.data.access_token, res.data.identifier);
      })
      .catch((e) => {
        if (e.response) {
          setData({
            ...data,
            salah: true,
          });
          console.log(e.response);
        } else if (e.request) {
          console.log('request : ' + e.request);
        } else {
          console.log('message : ' + e.message);
        }
      });
  };
  return (
    <div className="container">
      <div className="admin-login col-lg-3 mx-auto">
        <div>
          <div className="text-center">
            <img src={`${image_url}logo.png`} alt="logo-aqua-japan" />
          </div>
          <div className="card mt-3">
            <div className="card-header text-center py-3 title">
              {/* Sign In Now */}
            </div>
            <div className="card-body">
              {data.salah === false ? null : (
                <p
                  style={{
                    fontSize: 11,
                    color: '#eb4d4b',
                    alignSelf: 'center',
                  }}
                >
                  Login Gagal! Periksa kembali Email & Password.
                </p>
              )}
              <div>
                <div class="mb-3 mt-2">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    onChange={onChangeData}
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    onChange={onChangeData}
                  />
                </div>
              </div>
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password ?</Link>
              </div>
              <div class="d-grid gap-2 mb-3 mt-4">
                <button
                  class="btn btn-color-primary"
                  type="button"
                  onClick={fetchAPI}
                >
                  SIGN IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    customer_login: state.CUSTOMER_LOGIN,
    admin_login: state.ADMIN_LOGIN,
    user_permission: state.USER_PERMISSION,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCustomerLogin: (data) => dispatch({ type: 'CHANGE_CUSTOMER_LOGIN', value: data }),
    handleUser: (data) => dispatch({ type: 'CHANGE_USER', value: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
