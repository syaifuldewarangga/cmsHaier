import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function FormArticle(props) {
  const fileRef = React.useRef();
  const titleRef = React.useRef();
  const categoryRef = React.useRef();

  const history = useHistory();
  const [filePreview, setFilePreview] = useState('');
  const [errorData, setErrorData] = useState({
    file: '',
    title: '',
    category: '',
    content: '',
  });
  const [data, setData] = useState({
    file: '',
    title: '',
    category: '',
    content: '',
  });
  const [content, setContent] = useState('');

  const [category, setCategory] = useState([]);

  const onChangeData = (e) => {
    if (e.target.ariaLabel === 'file') {
      if (e.target.files['length'] !== 0) {
        setData({
          ...data,
          [e.target.ariaLabel]: e.target.files[0],
        });
        setFilePreview(URL.createObjectURL(e.target.files[0]));
      }
    } else {
      setData({
        ...data,
        [e.target.ariaLabel]: e.target.value,
      });
    }
  };

  React.useEffect(() => {
    if (props.data !== undefined) {
      setData({
        ...data,
        slug: props.data.slug,
        title: props.data.title,
        category: props.data.category,
        file: props.data.image,
      });
      setContent(props.data.content);
    }
    async function fetchData() {
      var token = localStorage.getItem('access_token');
      const request = await axios
        .get(props.base_url + 'category', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setCategory(res.data);
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
    fetchData();
  }, [props.base_url, props.data]);

  const onClicked = async () => {
    var token = localStorage.getItem('access_token');
    var id = localStorage.getItem('id');
    if (props.title === 'Edit Article') {
      const formData = new FormData();
      // formData.append('user_id', id);
      if (props.data.file !== data.file) {
        formData.append('file', data.file);
      }
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('content', content);
      formData.append('slug', data.slug);
      const request = await axios
        .put(props.base_url + 'article', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          alert('Berhasil!');
          history.push('/article/list');
        })
        .catch((e) => {
          console.log(e.response);
          let responError = e.response.data.errors;
          if (responError.location === 'file') {
            setErrorData({
              ...errorData,
              file: responError.reason,
            });
            fileRef.current.focus();
          }
          if (responError.location === 'title') {
            setErrorData({
              ...errorData,
              title: responError.reason,
            });
            titleRef.current.focus();
          }
          if (responError.location === 'category') {
            setErrorData({
              ...errorData,
              category: responError.reason,
            });
            categoryRef.current.focus();
          }
          if (responError.location === 'content') {
            setErrorData({
              ...errorData,
              content: responError.reason,
            });
          }
        });
      return request;
    } else {
      const formData = new FormData();
      formData.append('user_id', id);
      formData.append('file', data.file);
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('content', content);
      console.log(Object.fromEntries(formData))
      await axios
        .post(props.base_url + 'article', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          alert('Berhasil!');
          history.push('/article/list');
        })
        .catch((e) => {
          console.log(e.response)
          let responError = e.response.data.errors;
          if (responError.location === 'file') {
            setErrorData({
              ...errorData,
              file: responError.reason,
            });
            fileRef.current.focus();
          }
          if (responError.location === 'title') {
            setErrorData({
              ...errorData,
              title: responError.reason,
            });
            titleRef.current.focus();
          }
          if (responError.location === 'category') {
            setErrorData({
              ...errorData,
              category: responError.reason,
            });
            categoryRef.current.focus();
          }
          if (responError.location === 'content') {
            setErrorData({
              ...errorData,
              content: responError.reason,
            });
          }
        });
    }
  };

  return (
    <div>
      <div className="form-user">
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
                {filePreview !== '' ? (
                  <div className="col-lg-12 d-flex justify-content-center mb-3">
                    <img src={filePreview} alt="file" className="img-fluid" />
                  </div>
                ) : data.file !== '' && data.file !== undefined ? (
                  <div className="col-lg-12 d-flex justify-content-center mb-3">
                    <img
                      src={props.image_url + data.file}
                      alt="file"
                      className="img-fluid"
                    />
                  </div>
                ) : null}
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
                        ref={fileRef}
                      />
                      {errorData.file}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input
                      type="text"
                      class={`form-control ${
                        errorData.title !== '' ? 'is-invalid' : null
                      }`}
                      aria-label="title"
                      ref={titleRef}
                      onChange={onChangeData}
                      value={data.title}
                    />
                    <div class="invalid-feedback">{errorData.title}</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-3">
                <label class="form-label">Category</label>
                <select
                  class={`form-select ${
                    errorData.category !== '' ? 'is-invalid' : null
                  }`}
                  aria-label="category"
                  onChange={onChangeData}
                  defaultValue="Pilih"
                  ref={categoryRef}
                >
                  <option value="">Pilih</option>
                  {category.map(function (item, i) {
                    return (
                      <option
                        value={item.name}
                        key={i}
                        selected={data.category === item.name ? 'selected' : ''}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <div class="invalid-feedback">{errorData.category}</div>
              </div>
              <div className="col-lg-12">
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  // ariaLabel="content"
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const value = editor.getData();
                    setContent(value);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
                <div className="text-danger">{errorData.content}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <Link to="/article/list">
                  <div className="d-grid gap-2">
                    <button class="btn btn-outline-import" type="button">
                      Cancel
                    </button>
                  </div>
                </Link>
              </div>
              <div className="d-grid gap-2 col-6">
                <button
                  class="btn btn-import"
                  type="button"
                  onClick={onClicked}
                >
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

export default connect(mapStateToProps, null)(FormArticle);
