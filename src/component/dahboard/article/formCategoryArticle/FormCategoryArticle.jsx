import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal } from 'bootstrap';

const FormCategoryAricle = (props) => {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    {
      props.data === '' ? setData('') : setData(props.data.name);
    }
  }, [props.data]);

  const hideModal = () => {
    document.getElementById('closeCategoryModal').click()
  }

  const fetchAPI = async () => {
    var date = new Date();
    var token = localStorage.getItem('access_token');
    if (props.title === 'Edit Category') {
      const formData = new FormData();
      formData.append('id', props.data.id);
      formData.append('name', data);
      console.log(props.data.id)
        await axios
        .put(
          props.base_url + 'category', formData,
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then(() => {
          props.onChangeTime(date.getTime());
          hideModal()
          setData('')
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
    } else {
      const formData = new FormData();
      formData.append('name', data);
      console.log(data)
        await axios
        .post(
          props.base_url + 'category', formData,
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then(() => {
          props.onChangeTime(date.getTime());
          hideModal()
          setData('')
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
    }
  };
  return (
    <div
      class="modal fade"
      id="formCategoryArticle"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="formCategoryArticle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header btn-import">
            <h5 class="modal-title" id="staticBackdropLabel">
              {props.title}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="mb-3">
                <label class="form-label">Category</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => setData(e.target.value)}
                  value={data}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-import me-3"
                data-bs-dismiss="modal"
                id="closeCategoryModal"
              >
                {' '}
                Cancel{' '}
              </button>
              <button className="btn btn-import" onClick={() => fetchAPI()}>
                {' '}
                Save{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(FormCategoryAricle);
