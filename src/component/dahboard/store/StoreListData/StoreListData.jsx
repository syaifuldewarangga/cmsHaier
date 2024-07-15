import React from 'react';
import { connect } from 'react-redux';
import { permissionCek } from '../../../../action/permissionCek';

function StoreListData(props) {
  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'POST_STORE') &&
          <td>
            <div className="d-flex justify-content-start">
              <button
                className="btn d-flex btn-edit me-3 btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#formEditStore"
                onClick={() => props.handleStoreID(props.data.StoreID)}
              >
                <span class="material-icons-outlined md-18"> edit </span>
              </button>
            </div>
          </td>
        }
        <td>{props.data.StoreName}</td>
        <td>{props.data.PhoneOffice}</td>
        <td>{props.data.Province}</td>
        <td>{props.data.City}</td>
        <td>{props.data.District}</td>
        <td>{props.data.Street}</td>
        <td>{props.data.Island}</td>
        {/* <td>GAADA JUGA</td>
        <td>INI APA LAGI</td> */}
      </tr>
    </tbody>
  );
}

const mapsStateToProps = (state) => {
  return {
    user_permission: state.USER_PERMISSION
  }
}
export default connect(mapsStateToProps) (StoreListData);
