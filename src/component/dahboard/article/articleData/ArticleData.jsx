import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { permissionCek } from '../../../../action/permissionCek';

function ArticleListData(props) {
  const history = useHistory();
  async function fetchData() {
    var token = localStorage.getItem('access_token');
    const request = await axios
      .delete(props.base_url + 'article', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          slug: props.data.slug,
        },
      })
      .then((res) => {
        alert('Berhasil!');
        history.go(0);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        } else if (e.request) {
          console.log('request : ' + e.request);
        } else {
          console.log('message : ' + e.message);
        }
      });
    return request;
  }

  return (
    <tbody>
      <tr>
        <td className="align-middle">
          <div className="d-flex justify-content-start">
            {
              permissionCek(props.user_permission, 'UPDATE_ARTICLE') &&
              <Link to={'/article/edit/' + props.data.slug}>
                <button className="btn d-flex btn-edit me-3 btn-sm">
                  <span class="material-icons-outlined md-18"> edit </span>
                </button>
              </Link>
            }
            {
              permissionCek(props.user_permission, 'DELETE_ARTICLE') &&
              <button
                className="btn d-flex btn-danger me-3 btn-sm"
                onClick={() => props.remove(props.data.slug)}
              >
                <span class="material-icons-outlined md-18"> delete </span>
              </button>
            }
            <a href={`${props.frontend_url}blog/detail/${props.data.slug}`} target="_blank">
              <button className="btn d-flex btn-show btn-sm">
                <span class="material-icons-outlined md-18"> visibility </span>
              </button>
            </a>
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
        <td className="align-middle">{props.data.category}</td>
      </tr>
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    url: state.URL,
    base_url: state.BASE_URL,
    frontend_url: state.FRONTEND_URL,
    user_permission: state.USER_PERMISSION
  };
};

export default connect(mapStateToProps, null)(ArticleListData);
