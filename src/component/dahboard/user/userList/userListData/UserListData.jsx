import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function UserListData(props) {
  return (
    <tbody>
      <tr>
        <td>
          <div className="d-flex justify-content-start">
            <Link to={'/users/edit/' + props.data.username}>
              <button className="btn d-flex btn-edit me-3 btn-sm">
                <span class="material-icons-outlined md-18"> edit </span>
              </button>
            </Link>
            <button
              className="btn d-flex btn-danger me-3 btn-sm"
              onClick={() => props.remove(props.data.username)}
            >
              <span class="material-icons-outlined md-18"> delete </span>
            </button>
            {/* <Link to="/users/detail/1">
              <button className="btn d-flex btn-show btn-sm">
                <span class="material-icons-outlined md-18"> visibility </span>
              </button>
            </Link> */}
          </div>
        </td>
        <td>{props.data.username}</td>
        <td>{props.data.email}</td>
        <td>{props.data.roles}</td>
        <td>{props.data.status}</td>
        <td>{props.data.fullname}</td>
        <td>{props.data.gender}</td>
        <td>{props.data.phone}</td>
        <td>{props.data.created_at}</td>
      </tr>
    </tbody>
  );
}
const mapStateToProps = (state) => {
  return {
    url: state.URL,
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(UserListData);
