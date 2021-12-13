import React from 'react';
import { Link } from 'react-router-dom';

const StatusServiceData = (props) => {
  const newDate = props.data.purchase_date.toString().slice(0, 10);
  console.log(props.data);
  return (
    <tbody>
      <tr>
        {/* <td className="align-middle">
                    <img src="/assets/images/product/product1.png" style={{ width: "100px" }} />
                </td> */}
        <td className="align-middle">
          <Link
            to={
              '/customer/status-service/detail/' +
              props.data.srnum +
              '/' +
              props.data.mobile_phone
            }
            style={{ color: '#0d6efd' }}
          >
            {props.data.srnum}
          </Link>
        </td>
        <td className="align-middle">{props.data.mobile_phone}</td>
        <td className="align-middle">{newDate}</td>
        <td className="align-middle">{props.data.barcode}</td>
        <td className="align-middle">{props.data.brand}</td>
        <td className="align-middle">{props.data.category}</td>
      </tr>
    </tbody>
  );
};

export default StatusServiceData;
