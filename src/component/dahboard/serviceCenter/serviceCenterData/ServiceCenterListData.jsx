import React from 'react';
import { Link } from 'react-router-dom';

function ServiceCenterListData(props) {
  return (
    <tbody>
      <tr>
        <td>
          <div className="d-flex justify-content-start">
            <Link to={`/service-center/edit/${props.data.id}`}>
              <button className="btn d-flex btn-edit me-3 btn-sm">
                <span class="material-icons-outlined md-18"> edit </span>
              </button>
            </Link>
            <button
              className="btn d-flex btn-danger me-3 btn-sm"
              onClick={() => props.remove(props.data.id)}
            >
              <span class="material-icons-outlined md-18"> delete </span>
            </button>
          </div>
        </td>
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

export default ServiceCenterListData;
