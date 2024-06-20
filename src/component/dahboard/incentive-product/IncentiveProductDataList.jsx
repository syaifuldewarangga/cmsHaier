import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { permissionCek } from '../../../action/permissionCek';
const currentDate = new Date();
const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
function IncentiveProductDataList(props) {
  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') && permissionCek(props.user_permission, 'DELETE_USER') ?
          <td className="align-middle">
            <div className="d-flex justify-content-start">
              {
                permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') &&
                <Link to={'/incentive-product/edit/' + props.data.id}>
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
        
        <td className="align-middle">{props.data.name}</td>
        <td className="align-middle">{moment(props.data.start_date).format('LL')}</td>
        <td className="align-middle">{moment(props.data.end_date).format('LL')}</td>
        <td className="align-middle">
            <Link style={{ color: 'blue', textDecoration: 'underline', fontStyle: 'italic' }} to={'/incentive-product/detail/' + props.data.id}>
                Click here to see detail 
            </Link>
        </td>
        
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

export default connect(mapStateToProps, null)(IncentiveProductDataList);
