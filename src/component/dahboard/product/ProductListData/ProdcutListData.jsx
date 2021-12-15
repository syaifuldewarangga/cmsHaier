import React from 'react';
import { ImageFunction } from '../../../../variable/ImageFunction';

function ProductListData(props) {
  return (
    <tbody>
      <tr>
        <td>
          {
            props.data.Photo !== '' && props.data.Photo !== null?
            <img src={ImageFunction(props.data.Category)} height="65px" alt={props.data.Category} />
            : null
          }
        </td>
        <td>{props.data.Barcode}</td>
        <td>{props.data.ProductID}</td>
        <td>{props.data.Brand}</td>
        <td>{props.data.ProductName}</td>
        <td>{props.data.ProductModel}</td>
        <td>{props.data.SerialNumber}</td>
        <td>{props.data.CreatedDate}</td>
      </tr>
    </tbody>
  );
}

export default ProductListData;
