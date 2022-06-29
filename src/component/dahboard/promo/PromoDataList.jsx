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
                <Link to={'/promo/edit/' + props.data.id}>
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
        <td className="align-middle">{props.data.product_model}</td>
        <td className="align-middle">
          <img
            src={props.url + props.data.thumbnail}
            alt="blog-title"
            style={{ width: '150px' }}
          />
        </td>
        <td className="align-middle">{moment(props.data.start_program).format('DD/MM/YYYY')}</td>
        <td className="align-middle">{moment(props.data.end_program).format('DD/MM/YYYY')}</td>
        <td className="align-middle">{moment(props.data.start_purchase).format('DD/MM/YYYY')}</td>
        <td className="align-middle">{moment(props.data.end_purchase).format('DD/MM/YYYY')}</td>
        <td className="align-middle">{props.data.ex_warranty_days}</td>
        <td className="align-middle">{props.data.link}</td>
        
        
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
