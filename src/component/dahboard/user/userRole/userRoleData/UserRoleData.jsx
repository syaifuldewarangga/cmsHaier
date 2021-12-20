import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { permissionCek } from '../../../../../action/permissionCek';

function UserRoleData(props) {
  const history = useHistory();
  async function deleteRole() {
    var token = localStorage.getItem('access_token');
    const request = await axios
      .delete(props.base_url + 'role', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          rolename: props.data.name,
        },
      })
      .then((res) => {
        alert('Berhasil!');
        history.go(0);
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
  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'UPDATE_ROLE') && permissionCek(props.user_permission, 'DELETE_ROLE') ?
          <td>
            <div className="d-flex justify-content-start">
            {
              permissionCek(props.user_permission, 'UPDATE_ROLE') &&
              <Link to={'/user-role/edit/' + props.data.name}>
                <button className="btn d-flex btn-edit me-3 btn-sm">
                  <span class="material-icons-outlined md-18"> edit </span>
                </button>
              </Link>
            }
            {
              permissionCek(props.user_permission, 'DELETE_ROLE') &&
              <button
                className="btn d-flex btn-danger me-3 btn-sm"
                onClick={() => props.remove(props.data.name)}
              >
                <span class="material-icons-outlined md-18"> delete </span>
              </button>
            }
            </div>
          </td> : null
        }
        <td>{props.data.name}</td>
      </tr>
      {/* <tr>
        <td>
          <div className="d-flex justify-content-start">
            <button className="btn d-flex btn-edit me-3 btn-sm">
              <span class="material-icons-outlined md-18"> edit </span>
            </button>
            <button className="btn d-flex btn-danger me-3 btn-sm">
              <span class="material-icons-outlined md-18"> delete </span>
            </button>
          </div>
        </td>
        <td>IT</td>
      </tr> */}
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    url: state.URL,
    base_url: state.BASE_URL,
    user_permission: state.USER_PERMISSION
  };
};

export default connect(mapStateToProps, null)(UserRoleData);
