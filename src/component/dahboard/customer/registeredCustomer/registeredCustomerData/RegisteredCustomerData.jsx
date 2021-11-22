import { decode, encode } from 'base-64';
import React from 'react';
import { Link } from 'react-router-dom';

function RegisteredCustomerData(props) {
  const encodeUserID = encode(props.data.id);
  return (
    <tbody>
      <tr>
        <td>
          <div className="d-flex justify-content-start">
            <Link to={`/customer/registered-customer/${props.data.username}`}>
              <button className="btn d-flex btn-show btn-sm">
                <span class="material-icons-outlined md-18"> visibility </span>
              </button>
            </Link>
          </div>
        </td>
        <td style={{ color: '#5C9CFF' }}>
          <Link to={`/customer/registered-product/user/${encodeUserID}`}>
            {props.data.first_name + ' ' + props.data.last_name}
          </Link>
        </td>
        <td>{props.data.nik}</td>
        <td>{props.data.gender}</td>
        <td>{props.data.birth_date}</td>
        <td>{props.data.age}</td>
        <td>{props.data.phone}</td>
        <td>{props.data.province}</td>
        <td>{props.data.district}</td>
        <td>{props.data.sub_district}</td>
        <td>{props.data.postal_code}</td>
        <td>{props.data.address}</td>
        <td>{props.data.created_at}</td>
      </tr>
    </tbody>
  );
}

export default RegisteredCustomerData;
