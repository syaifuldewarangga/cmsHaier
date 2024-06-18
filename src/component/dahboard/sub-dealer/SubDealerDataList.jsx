import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { permissionCek } from '../../../action/permissionCek';
import moment from 'moment'

function PromoDataList(props) {
  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') && permissionCek(props.user_permission, 'DELETE_USER') ?
          <td className="align-middle">
            <div className="d-flex justify-content-start">
              {
                permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') &&
                <Link to={'/sub-dealer/detail/' + props.data.id}>
                  <button className="btn d-flex btn-edit me-3 btn-sm">
                    <span class="material-icons-outlined md-18">info</span>
                  </button>
                </Link>
              }
              {
                permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') &&
                  <button className="btn d-flex btn-warning me-3 btn-sm" onClick={() => props.modalResetPassword(props.data.id)}>
                      <span class="material-icons-outlined md-18">restart_alt</span>
                  </button>
              }
            </div>
          </td> : null
        }
        
        <td className="align-middle">Toko Dealer 1</td>
        <td className="align-middle">02158585858</td>
        <td className="align-middle">sub.dealer@gmail.com</td>
        
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

export default connect(mapStateToProps, null)(PromoDataList);
