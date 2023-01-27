import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { permissionCek } from '../../../../action/permissionCek';
import moment from 'moment'

function HistoryPromoDataList(props) {
  return (
    <tbody>
      <tr>
        <td className="align-middle">{props.data.promo_code}</td>
        <td className="align-middle">{props.data.name}</td>
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

export default connect(mapStateToProps, null)(HistoryPromoDataList);
