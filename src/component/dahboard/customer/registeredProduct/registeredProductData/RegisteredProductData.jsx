import React from 'react';
import { connect } from 'react-redux';
import { ImageFunction } from '../../../../../variable/ImageFunction';

function RegisteredProductData(props) {
  console.log(props.data);
  return (
    <tbody>
      <tr>
        <td className="align-middle">{props.data.store_name}</td>
        <td className="align-middle">
          <img src={ImageFunction(props.data.category)} style={{ width: '100px' }} />
        </td>
        <td className="align-middle">{props.data.barcode}</td>
        <td className="align-middle">{props.data.product_id}</td>
        <td className="align-middle">{props.data.product_name}</td>
        <td className="align-middle">{props.data.product_id}</td>
        <td className="align-middle">MASIH BELUM ADA DATANYA</td>
        <td className="align-middle">{props.data.date}</td>
        <td className="align-middle">{props.data.store_location}</td>
        <td className="align-middle">{props.data.store_name}</td>
        <td className="align-middle">{props.data.email}</td>
        <td className="align-middle">{props.data.created_at}</td>
      </tr>
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    url: state.URL,
  };
};

export default connect(mapStateToProps, null)(RegisteredProductData);
