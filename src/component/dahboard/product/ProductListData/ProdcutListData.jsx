import React from 'react';

function ProductListData(props) {
  return (
    <tbody>
      <tr>
        <td>
          {
            props.data.Photo !== '' && props.data.Photo !== null?
            <img src={props.data.Photo} height="65px" alt="kulkas aqua japan" />
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
