import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { permissionCek } from '../../../../../action/permissionCek';

function UserListData(props) {
  console.log(permissionCek(props.user_permission, 'DELETE_USER'))
  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'UPDATE_USER') === true || permissionCek(props.user_permission, 'DLETE_USER') ?
          <td>
            <div className="d-flex justify-content-start">
              {
                permissionCek(props.user_permission, 'UPDATE_USER') ? 
                <Link to={'/users/edit/' + props.data.username}>
                  <button className="btn d-flex btn-edit me-3 btn-sm">
                    <span class="material-icons-outlined md-18"> edit </span>
                  </button>
                </Link> : null
              }
              {
                permissionCek(props.user_permission, 'DELETE_USER') ?
                <button
                  className="btn d-flex btn-danger me-3 btn-sm"
                  onClick={() => props.remove(props.data.username)}
                >
                  <span class="material-icons-outlined md-18"> delete </span>
                </button> : null
              }
              {/* <Link to="/users/detail/1">
                <button className="btn d-flex btn-show btn-sm">
                  <span class="material-icons-outlined md-18"> visibility </span>
                </button>
              </Link> */}
            </div>
          </td> : null
        }
        <td>{props.data.username}</td>
        <td>{props.data.email}</td>
        <td>{props.data.roles}</td>
        <td>{props.data.status}</td>
        <td>{props.data.first_name} {props.data.last_name}</td>
        <td>{props.data.gender}</td>
        <td>{props.data.phone}</td>
        <td>{props.data.created_at}</td>
      </tr>
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

export default connect(mapStateToProps, null)(UserListData);
