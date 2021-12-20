import React from 'react';
import { connect } from 'react-redux';
import { permissionCek } from '../../../../action/permissionCek';

const CategoryArticleData = (props) => {
  const onChange = () => {
    props.onChangeTitle('Edit Category');
    props.onChangeIsi(props.data);
  };

  return (
    <tbody>
      <tr>
        {
          permissionCek(props.user_permission, 'UPDATE_CATEGORY') && permissionCek(props.user_permission, 'DELETE_CATEGORY') ?
          <td>
            <div className="d-flex justify-content-start">
              {
                permissionCek(props.user_permission, 'UPDATE_CATEGORY') &&
                <button className="btn d-flex btn-edit me-3 btn-sm">
                  <span
                    class="material-icons-outlined md-18"
                    onClick={() => onChange()}
                    data-bs-toggle="modal"
                    data-bs-target="#formCategoryArticle"
                  >
                    {' '}
                    edit{' '}
                  </span>
                </button>
              }
              {
                permissionCek(props.user_permission, 'DELETE_CATEGORY') &&
                <button 
                  className="btn d-flex btn-danger me-3 btn-sm"
                  onClick={() => props.remove(props.data.id)}
                >
                  <span class="material-icons-outlined md-18" >
                    {' '}
                    delete{' '}
                  </span>
                </button>
              }
            </div>
          </td> : null
        }
        <td>{props.data.name}</td>
      </tr>
    </tbody>
  );
};

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    user_permission: state.USER_PERMISSION
  };
};

export default connect(mapStateToProps, null)(CategoryArticleData);
