import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function BannerData(props) {
  return (
    <tbody>
      <tr>
        <td className="align-middle">
          <div className="d-flex justify-content-start">
            <Link to={'/banner/edit/' + props.data.id}>
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
        <td className="align-middle">
          <img
            src={props.url + props.data.image}
            alt="blog-title"
            style={{ width: '150px' }}
          />
        </td>
        <td className="align-middle">{props.data.title}</td>
        <td className="align-middle">{props.data.link}</td>
        <td className="align-middle">
          {props.data.status ? 'Active' : 'Not Active'}
        </td>
      </tr>
      {/* <tr>
          <td className="align-middle">
            <div className="d-flex justify-content-start">
              <button className="btn d-flex btn-edit me-3 btn-sm">
                <span class="material-icons-outlined md-18"> edit </span>
              </button>
              <button className="btn d-flex btn-danger me-3 btn-sm">
                <span class="material-icons-outlined md-18"> delete </span>
              </button>
            </div>
          </td>
          <td className="align-middle">
            <img
              src="/assets/images/banner/blog-banner.png"
              alt="blog-title"
              style={{ width: '150px' }}
            />
          </td>
          <td className="align-middle">Event 1</td>
          <td className="align-middle">http://localhost:3000/banner/list</td>
          <td className="align-middle">Not Active</td>
        </tr> */}
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    url: state.URL,
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(BannerData);
