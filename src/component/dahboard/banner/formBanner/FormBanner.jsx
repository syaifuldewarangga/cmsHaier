import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

function FormBanner(props) {
  const { id } = useParams();
  const history = useHistory();
  const [errorData, setErrorData] = useState({
    file: '',
    title: '',
    link: '',
    status: '',
  })
  const [data, setData] = useState({
    file: '',
    title: '',
    link: '',
    status: '',
  });
  const [filePreview, setFilePreview] = useState('');

  const onChangeData = (e) => {
    if (e.target.ariaLabel === 'file') {
      if(e.target.files['length'] !== 0) {
        setData({
          ...data,
          [e.target.ariaLabel]: e.target.files[0],
        });
        setFilePreview(URL.createObjectURL(e.target.files[0]))
      }
    } else {
      setData({
        ...data,
        [e.target.ariaLabel]: e.target.value,
      });
    }
  };

  const hanleErrors = (responError) => {
    if(responError.location === 'title') {
      setErrorData({
        ...errorData,
        title: responError.reason
      })
    }

    if(responError.location === 'file') {
      setErrorData({
        ...errorData,
        file: responError.reason
      })
    }

    if(responError.location === 'link') {
      setErrorData({
        ...errorData,
        link: responError.reason
      })
    }

    if(responError.location === 'status') {
      setErrorData({
        ...errorData,
        link: responError.reason
      })
    }
  }
  const fetchAPI = async () => {
    var token = localStorage.getItem('access_token');

    if (props.title === 'Edit Banner') {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', data.file);
      formData.append('title', data.title);
      formData.append('link', data.link);
      formData.append('status', data.status);
      const request = await axios
        .put(props.base_url + 'banner', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          let formStatus = new FormData()
          formStatus.append('id', id);
          formStatus.append('status', data.status);
          axios.put(props.base_url + 'banner/set', formStatus, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }).then((res) => {
            alert('Berhasil!');
            history.push('/banner/list');
          })
        })
        .catch((e) => {
          let responError = e.response.data.errors
          hanleErrors(responError)
        });
      return request;
    } else {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('title', data.title);
      formData.append('link', data.link);
      formData.append('status', data.status);
      await axios
        .post(props.base_url + 'banner', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        })
        .then((res) => {
          let formStatus = new FormData()
          formStatus.append('id', id);
          formStatus.append('status', data.status);
          axios.put(props.base_url + 'banner/set', formStatus, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }).then((res) => {
            alert('Berhasil!');
            history.push('/banner/list');
          })
        })
        .catch((e) => {
          let responError = e.response.data.errors
          hanleErrors(responError)
        });
    }
  };

  React.useEffect(() => {
    if (props.data !== undefined) {
      setData({
        ...data,
        title: props.data.title,
        file: props.data.image,
        link: props.data.link,
        status: props.data.status === true ? '1' : '0',
      });
    }
  }, [props.data]);

  return (
    <div>
      <div className="form-banner">
        <div className="card">
          <div className="card-header btn-import  ">
            <h5
              className="dashboard title"
              style={{ margin: '0', padding: '7px 0' }}
            >
              {props.title}
            </h5>
          </div>
          <div className="card-body">
            <div className="mb-5">
              <div className="row">
                {
                  filePreview !== '' ?
                  <div className="col-lg-12 d-flex justify-content-center mb-3">
                    <img src={filePreview} alt="file" className="img-fluid"/>
                  </div> :

                  data.file !== '' && data.file !== undefined ?
                  <div className="col-lg-12 d-flex justify-content-center mb-3">
                    <img src={props.image_url + data.file} alt="file" className="img-fluid"/>
                  </div> : null
                }
                <div className="col-lg-12 mb-3">
                  <div className="btn-upload-custom">
                    <div class="dropzone-wrapper">
                      <div class="dropzone-desc">
                        <span class="material-icons"> cloud_upload </span>
                        <p>Choose an image file or drag it here.</p>
                      </div>
                      <input
                        type="file"
                        name="img_logo"
                        class="dropzone"
                        aria-label="file"
                        onChange={onChangeData}
                      />
                      { errorData.file }
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input
                      type="text"
                      class={`form-control ${errorData.title !== '' ? 'is-invalid': null }`}
                      aria-label="title"
                      onChange={onChangeData}
                      value={data.title}
                    />
                    <div class="invalid-feedback">
                      { errorData.title }
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Redirect Url</label>
                    <input
                      type="url"
                      class={`form-control ${errorData.link !== '' ? 'is-invalid': null }`}
                      aria-label="link"
                      onChange={onChangeData}
                      value={data.link}
                    />
                    <div class="invalid-feedback">
                      { errorData.link }
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Status</label>
                    <select 
                      class={`form-select ${errorData.status !== '' ? 'is-invalid': null }`} 
                      aria-label="status"
                      onChange={onChangeData}
                    >
                      <option value="1" selected= {data.status === '1' ? 'selected' : null}>Active</option>
                      <option value="0" selected={data.status === '0' ? 'selected' : null}>Not Active</option>
                    </select>
                    <div class="invalid-feedback">
                      { errorData.status }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <Link to="/banner/list">
                  <div className="d-grid gap-2">
                    <button class="btn btn-outline-import" type="button">
                      Cancel
                    </button>
                  </div>
                </Link>
              </div>
              <div className="d-grid gap-2 col-6">
                <button class="btn btn-import" type="button" onClick={fetchAPI}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    image_url: state.URL,
  };
};

export default connect(mapStateToProps, null)(FormBanner);