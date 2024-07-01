import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { permissionCek } from '../../../../action/permissionCek';

function UserSalesDataList(props) {
  const { data } = props;
  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') && permissionCek(props.user_permission, 'DELETE_USER') ?
          <td className="align-middle">
            <div className="d-flex justify-content-start">
              {
                permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') &&
                <Link to={'/user-sales/detail/' + props.data.id}>
                  <button className="btn d-flex btn-edit me-3 btn-sm">
                    <span class="material-icons-outlined md-18">info</span>
                  </button>
                </Link>
              }
              {
                permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') &&
                <Link to={'/user-sales/edit/' + props.data.id}>
                  <button className="btn d-flex btn-edit me-3 btn-sm">
                    <span class="material-icons-outlined md-18"> edit </span>
                  </button>
                </Link>
              }
            </div>
          </td> : null
        }
        
        <td className="align-middle">{data?.first_name + data?.last_name}</td>
        <td className="align-middle">{data?.phone}</td>
        <td className="align-middle">{data?.email}</td>
        <td className="align-middle">{data?.status === 'active' ? 'Active' : 'Not Active'}</td>
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

export default connect(mapStateToProps, null)(UserSalesDataList);
