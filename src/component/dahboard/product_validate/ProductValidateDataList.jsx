import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { permissionCek } from '../../../action/permissionCek';
import { ImageFunction } from '../../../variable/ImageFunction';

function ProductValidateDataList(props) {
  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') && permissionCek(props.user_permission, 'DELETE_USER') ?
          <td className="align-middle">
            <div className="d-flex justify-content-start">
              {
                permissionCek(props.user_permission, 'UPDATE_WARRANTY_PROMO') &&
                <Link to={'/product-validate/edit/:id' + props.data.id}>
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
                  <span class="material-icons-outlined md-18"> close </span>
                </button>
              }
              {
                permissionCek(props.user_permission, 'DELETE_WARRANTY_PROMO') &&
                <button
                  className="btn d-flex btn-success me-3 btn-sm"
                  onClick={() => props.approve(props.data.id)}
                >
                  <span class="material-icons-outlined md-18"> check </span>
                </button>
              }
            </div>
          </td> : null
        }
        <td>{props.data.barcode}</td>
        <td>{props.data.product_id}</td>
        <td>{props.data.brand}</td>
        <td>{props.data.product_name}</td>
        <td>{props.data.barcode}</td>
        <td>
          {
            props.data.invoice !== '' && props.data.invoice !== null ?
            <a className='badge bg-primary' href={`${props.url}${props.data.invoice}`} target='_blank'>View Invoice</a>
            : null
          }
        </td>
        <td>
          {
            props.data.warranty_card !== '' && props.data.warranty_card !== null ?
            <a className='badge bg-primary' href={`${props.url}${props.data.warranty_card}`} target='_blank'>View Warranty Card/Serial Number</a>
            : null
          }
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

export default connect(mapStateToProps, null)(ProductValidateDataList);
