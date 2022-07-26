import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment';
import { produce } from "immer";

const FormPromo = (props) => {
    const [form, setForm] = useState({
        start_program: '',
        end_program: '',
        start_purchase: '',
        end_purchase: '',
        ex_warranty_days: '',
        ex_warranty_days_text: '',
        thumbnail: '',
        notification_text: '',
        link: '',
        product_model: '',
        name: '',
        id: '',
    })
    const history = useHistory();
    const [errorsData, setErrorsData] = useState({})
    const [filePreview, setFilePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [answers, setAnswers] = useState([''])

    const onChangeData = (e) => {
        if(e.target.type === 'file'){
            if (e.target.files['length'] !== 0) {
                setForm({
                  ...form,
                  thumbnail: e.target.files[0],
                });
                setFilePreview(URL.createObjectURL(e.target.files[0]));
              }
        }else{
            setForm({
                ...form,
                [e.target.ariaLabel]: e.target.value
            })
        }
        
    }

    const fetchAPI = (e) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('start_program', moment(form.start_program).format('YYYY/MM/DD'));
        formData.append('end_program',  moment(form.end_program).format('YYYY/MM/DD'));
        formData.append('start_purchase', moment(form.start_purchase).format('YYYY/MM/DD'));
        formData.append('end_purchase', moment(form.end_purchase).format('YYYY/MM/DD'));
        formData.append('ex_warranty_days', form.ex_warranty_days);
        formData.append('ex_warranty_days_text', form.ex_warranty_days_text);
        formData.append('notification_text', form.notification_text);
        formData.append('link', form.link);
        formData.append('name', form.name);
        formData.append('thumbnail', form.thumbnail);
        // console.log(answers)
        answers.map(v => {
          formData.append('product_model', v);
        })
        console.log(Object.fromEntries(formData))
        var token = localStorage.getItem('access_token');
        if(props.title === 'Edit Promo'){
            //Update
            formData.append('id', form.id);
            axios.post(props.base_url + 'extended-warranty-promo/edit', formData, {
              headers: {
                  Authorization: 'Bearer ' + token,
                  'Content-Type': 'application/json',
              },
            })
            .then((res) => {
                alert('berhasil edit promo');
                history.push('/promo');
            })
            .catch((e) => {
                let responError = e.response.data.errors?.location;
                if(typeof responError !== 'undefined'){
                  // console.log(responError)
                  setErrorsData(responError)
                  if(typeof responError?.thumbnail !== 'undefined' ){
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    })
                  }
                }
            }).finally(() => {
                setIsLoading(false)
            });

        }else{
            //Insert
            axios.post(props.base_url + 'extended-warranty-promo', formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                alert('berhasil');
                history.push('/promo');
            })
            .catch((e) => {
              let responError = '';
              console.log(e.response)
              if(typeof e.response.data.errors !== 'undefined')
                responError = e.response.data.errors.location;
                // console.log(responError)
                setErrorsData(responError)
                if(typeof responError?.thumbnail !== 'undefined' ){
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }
            }).finally(() => {
                setIsLoading(false)
            });
        }
    }

    useEffect(() => {
      // console.log(props.data)
        if(typeof props.data !== 'undefined'){
            let data = {
              ...props.data.extendedWarranty
            }
            console.log(props.data.productModelList)
            if(props.data.productModelList){
              setAnswers([...props.data.productModelList])
            }else{
              setAnswers([])
            }
            setForm({
                start_program: moment(data.start_program).format('yyyy-MM-DD'),
                end_program: moment(data.end_program).format('yyyy-MM-DD'),
                start_purchase: moment(data.start_purchase).format('yyyy-MM-DD'),
                end_purchase: moment(data.end_purchase).format('yyyy-MM-DD'),
                ex_warranty_days: data.ex_warranty_days,
                ex_warranty_days_text: data.ex_warranty_days_text,
                thumbnail: data.thumbnail,
                notification_text: data.notification_text,
                link: data.link,
                product_model: data.product_model,
                name: data.name,
                id: data.id,
            })
        }

    }, [props.base_url, props.data])

    return (
    <div>
      <div className="form-user">
        <div className="card ">
          <div className="card-header btn-import  ">
            <h5
              className="dashboard title"
              style={{ margin: '0', padding: '7px 0' }}
            >
              {props.title}
            </h5>
          </div>
          <div className="card-body">
            
            {/* Form */}
            <div className="row">
              {filePreview !== '' ? (
                <div className="col-lg-12 d-flex justify-content-center mb-3">
                  <img src={filePreview} alt="file" className="img-fluid" />
                </div>
              ) : form.thumbnail !== '' && form.thumbnail !== undefined ? (
                <div className="col-lg-12 d-flex justify-content-center mb-3">
                  <img
                    src={props.image_url + form.thumbnail}
                    alt="file"
                    className="img-fluid"
                  />
                </div>
              ) : null}
              <div className="col-lg-12 mb-3">
                <div className="btn-upload-custom">
                  <div className="dropzone-wrapper">
                    <div className="dropzone-desc">
                      <span className="material-icons"> cloud_upload </span>
                      <p className={
                        typeof errorsData?.thumbnail !== 'undefined' ? 'is-invalid text-danger' : null
                      }>{typeof errorsData?.thumbnail !== 'undefined' ? 'Thumbnail is Required' : 'Choose an image file or drag it here.'}</p>
                    </div>
                    <input
                      type="file"
                      name="thumbnail"
                      className="dropzone"
                      onChange={onChangeData}
                    />
                  </div>
                </div>
              </div>

               {/* Product Model & title
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Product Model</label>
                  <input
                    type="text"
                    className={`form-control ${
                        typeof errorsData?.product_model !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="product_model"
                    onChange={onChangeData}
                    value={form.product_model}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.product_model}</div>
                </div>
              </div> */}
              

              {/* Start - End Program */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Start Program</label>
                  <input
                    type="date"
                    className={`form-control ${
                        typeof errorsData?.start_program !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="start_program"
                    onChange={onChangeData}
                    value={form.start_program}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.start_program}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">End Program</label>
                  <input
                    type="date"
                    className={`form-control ${
                        typeof errorsData?.end_program !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="end_program"
                    onChange={onChangeData}
                    value={form.end_program}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.end_program}</div>
                </div>
              </div>

              {/* Start - End Purchase  */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Start Purchase</label>
                  <input
                    type="date"
                    className={`form-control ${
                        typeof errorsData?.start_purchase !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="start_purchase"
                    onChange={onChangeData}
                    value={form.start_purchase}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.start_purchase}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">End Purchase</label>
                  <input
                    type="date"
                    className={`form-control ${
                        typeof errorsData?.end_purchase !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="end_purchase"
                    onChange={onChangeData}
                    value={form.end_purchase}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.end_purchase}</div>
                </div>
              </div>

              {/* Warranty & Waranty text */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Warranty Days</label>
                  <input
                    type="text"
                    className={`form-control ${
                        typeof errorsData?.ex_warranty_days !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="ex_warranty_days"
                    onChange={onChangeData}
                    value={form.ex_warranty_days}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.ex_warranty_days}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Warranty Text</label>
                  <input
                    type="text"
                    className={`form-control ${
                        typeof errorsData?.ex_warranty_days_text !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="ex_warranty_days_text"
                    onChange={onChangeData}
                    value={form.ex_warranty_days_text}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.ex_warranty_days_text}</div>
                </div>
              </div>

              {/* Notif Text & Link */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Notification Text</label>
                  <textarea
                    rows="3"
                    className={`form-control ${
                        typeof errorsData?.notification_text !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="notification_text"
                    onChange={onChangeData}
                    required
                    value={form.notification_text}
                  >
                    
                  </textarea>
                  <div className="invalid-feedback">{errorsData.notification_text}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Link</label>
                  <textarea
                    rows="3"
                    className={`form-control ${
                        typeof errorsData?.link !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="link"
                    onChange={onChangeData}
                    required
                    value={form.link}
                  ></textarea>
                  <div className="invalid-feedback">{errorsData.link}</div>
                </div>
              </div>

              {/* title and product model  */}
              <div className="col-lg-12">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className={`form-control ${
                        typeof errorsData?.name !== 'undefined' ? 'is-invalid' : null
                    }`}
                    aria-label="name"
                    onChange={onChangeData}
                    value={form.name}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.name}</div>
                </div>
              </div>

              <div className="col-lg-12">
                <label className="form-label">Product Model</label>

              </div>
              {answers.map((answer, index) => {
                      return (
                        <div className="col-lg-6">
                          <div class="mb-3" key={index}>
                              <div className="d-flex">
                                  <input 
                                      required
                                      className={`form-control ${
                                        typeof errorsData?.product_model !== 'undefined' ? 'is-invalid' : null
                                    }`} 
                                      type="text"  
                                      onChange={e => {
                                          const answer = e.target.value;
                                          setAnswers(currentAnswers => 
                                              produce(currentAnswers, v => {
                                                  v[index] = answer
                                              })
                                          );
                                      }}
                                      value={answer}

                                  />   
                                { answers.length > 1 ?
                                <button 
                                    className="btn btn-danger ms-3" 
                                    type="button"
                                    onClick={() => {
                                        setAnswers(currentAnswers => currentAnswers.filter((answer, x) => x !== index))
                                    }}
                                > 
                                    <span class="material-icons"> delete </span>
                                </button>
                                : ""}
                              </div>
                              {typeof errorsData?.product_model !== 'undefined' && 
                                    <div className="invalid-feedback d-block">{errorsData.product_model}</div>
                              }
                          </div>
                        </div>
                      )
                  })}
              <div className="col-lg-12">
                <div className="mb-3">
                  <div>
                      <button 
                          className="btn btn-add" 
                          type="button"
                          onClick={() => {
                              setAnswers(currentAnswers => [
                                  ...currentAnswers, ""
                              ])
                          }}
                      >
                          Add Product Model
                      </button>
                  </div>
                </div>
              </div>
              

              
            </div>

            <div className="row">
              <div className="col-6">
                <Link to="/users">
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-import" type="button">
                      Cancel
                    </button>
                  </div>
                </Link>
              </div>
              <div className="d-grid gap-2 col-6">
                <button 
                  className="btn btn-import" 
                  type="button" 
                  disabled={isLoading && 'disabled'}
                  onClick={fetchAPI}
                >
                  {
                    isLoading ?
                    <Fragment>
                        <span class="spinner-border spinner-border-sm me-1  " role="status" aria-hidden="true"></span>
                        Loading...
                    </Fragment> :
                    props.title === 'Edit Promo' ? 'Save' : 'Create'
                  }
                </button>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
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
      image_url: state.URL,
    };
  };
  
  export default connect(mapStateToProps, null)(FormPromo);