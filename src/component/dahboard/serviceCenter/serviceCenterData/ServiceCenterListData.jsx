import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { permissionCek } from '../../../../action/permissionCek';

function ServiceCenterListData(props) {
  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'UPDATE_SERVICE_CENTER') && permissionCek(props.user_permission, 'DELETE_SERVICE_CENTER') ?
          <td>
            <div className="d-flex justify-content-start">
              {
                permissionCek(props.user_permission, 'UPDATE_SERVICE_CENTER') &&
                <Link to={`/service-center/edit/${props.data.id}`}>
                  <button className="btn d-flex btn-edit me-3 btn-sm">
                    <span class="material-icons-outlined md-18"> edit </span>
                  </button>
                </Link>
              }
              {
                permissionCek(props.user_permission, 'DELETE_SERVICE_CENTER') &&
                <button
                  className="btn d-flex btn-danger me-3 btn-sm"
                  onClick={() => props.remove(props.data.id)}
                >
                  <span class="material-icons-outlined md-18"> delete </span>
                </button>
              }
            </div>
          </td> : null
        }
        <td>{props.data.service_center_name}</td>
        <td>{props.data.phone_office}</td>
        <td>{props.data.province}</td>
        <td>{props.data.city}</td>
        <td>{props.data.district}</td>
        <td>{props.data.postal_code}</td>
        <td>{props.data.address}</td>
        <td>{props.data.open_day}</td>
        <td>{props.data.close_day}</td>
        <td>{props.data.open_hour}</td>
        <td>{props.data.latitude}, {props.data.longitude}</td>
      </tr>
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    user_permission: state.USER_PERMISSION
  }
} 
export default connect(mapStateToProps, null) (ServiceCenterListData);
