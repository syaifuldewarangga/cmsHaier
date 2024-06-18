import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { permissionCek } from '../../../../action/permissionCek';

function UserSalesDataList(props) {
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
              {
                permissionCek(props.user_permission, 'DELETE_WARRANTY_PROMO') &&
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
        
        <td className="align-middle">User Sales 1</td>
        <td className="align-middle">02158585858</td>
        <td className="align-middle">user_sales1@gmail.com</td>
        <td className="align-middle">Pria</td>
        <td className="align-middle">Active</td>
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
