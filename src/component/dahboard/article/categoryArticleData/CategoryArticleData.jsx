import React from 'react';
import { connect } from 'react-redux';

const CategoryArticleData = (props) => {
  const onChange = () => {
    props.onChangeTitle('Edit Category');
    props.onChangeIsi(props.data);
  };

  return (
    <tbody>
      <tr>
        <td>
          <div className="d-flex justify-content-start">
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
            <button 
              className="btn d-flex btn-danger me-3 btn-sm"
              onClick={() => props.remove(props.data.id)}
            >
              <span class="material-icons-outlined md-18" >
                {' '}
                delete{' '}
              </span>
            </button>
          </div>
        </td>
        <td>{props.data.name}</td>
      </tr>
    </tbody>
  );
};

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(CategoryArticleData);
