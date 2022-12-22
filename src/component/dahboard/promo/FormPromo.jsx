import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment';
import { produce } from "immer";
import readXlsxFile from 'read-excel-file';
import Autocomplete from 'react-autocomplete';
import ModalConfirm from './ModalConfirm';
import { Modal } from 'bootstrap';
const FormPromo = (props) => {
    const [form, setForm] = useState({
        promo_code: '',
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
    const [answers, setAnswers] = useState([{ value: '' }])
    const [options, setOptions] = useState([])

    const getOptions = async () => {
      const res = await axios.get(`${props.base_url}extended-warranty-promo/wms?product_model=`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
      })
      setOptions([...res.data])
    }

    const importExcel = async (e) => {
      const data = await readXlsxFile(e.target.files[0])
      const temp = data.map(v => {
        return {
          'value': v[0],
          'status': '',
        }
      }).slice(1, data.length)
      setAnswers([...answers, ...temp])

      e.target.value = '';

    }

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

    const checkProductModel = () => {
      const cek = answers.map(v => {
        return options.includes(v.value)
      })
      return cek.every((elem, index, arr) => elem == true)
    }

    const hideModal = () => {
      let alertModal = Modal.getInstance(document.getElementById('modalConfirm'));   
      // console.log(alertModal)
      if(alertModal!== null) alertModal.hide();
    }

    const handleModal = () => {
      let alertModal = new Modal(document.getElementById('modalConfirm'));
      alertModal.show();
    }

    const fetchAPI = () => {
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
          formData.append('product_model', v.value);
        })
        // console.log(Object.fromEntries(formData))
        var token = localStorage.getItem('access_token');
        const modalExist = document.getElementById('modalConfirm') 
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

                //close modal
                if(typeof modalExist !== null && modalExist !== 'undefined' ){
                  hideModal()
                }
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
              // console.log(e.response)
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

                //close modal
                if(typeof modalExist !== null && modalExist !== 'undefined' ){
                  hideModal()
                }
            });
        }
    }
    const onSubmit = () => {
      const cek = checkProductModel()
      // console.log(document.getElementById('modalConfirm'))
      if(cek){
        fetchAPI()
      }else{
        handleModal()
      }
    }

    useEffect(() => {
      // console.log(props.data)
        if(typeof props.data !== 'undefined'){
            let data = {
              ...props.data.extendedWarranty
            }
            // console.log(props.data.productModelList)
            if(props.data.productModelList){
              let temp = props.data.productModelList.map(v => {
                return {
                  value: v,
                  status: ''
                }
              })
              setAnswers([...temp])
            }else{
              setAnswers([])
            }
            setForm({
                ...form,
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

    useEffect(() => {
      let mounted = true
      if(mounted && options.length == 0){
        getOptions()
      }


      return () => mounted = false
    }, [options.length])

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
              {/* Promo Code */}
              <div className="col-lg-12">
                <div className="mb-3">
                  <label className="form-label">Promo Code</label>
                  <input
                    type="text"
                    className={`form-control ${
                      typeof errorsData?.promo_code !== 'undefined' ? 'is-invalid' : null
                     }`}
                    aria-label="promo_code"
                    onChange={onChangeData}
                    value={form.promo_code}
                    required
                  />
                  <div className="invalid-feedback">{errorsData.promo_code}</div>
                </div>
              </div> 

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
                <div className="mb-3">
                      <input 
                          name={`product_model_import`}
                          id={`product_model_import`} 
                          type="file" 
                          onChange={importExcel} 
                          style={{ display: 'none' }}
                      />
                        <label 
                          htmlFor="product_model_import"
                          className="btn btn-add" 
                        >
                          <div className="d-flex align-items-center">
                          <span className="material-icons-outlined me-3"> file_upload </span>
                          <span className="fw-bold">Import</span>

                          </div>
                        </label>
                    </div>
              </div>
              {options.length > 0 && answers.map((answer, index) => {
                      return (
                        <div className="col-lg-6">
                          <div class="mb-3">
                              <div className="d-flex w-100">
                                <Autocomplete
                                    wrapperStyle={{ width:'100%' }}
                                    getItemValue={(item) => item}
                                    items={
                                      options.filter(v => v.includes(answer?.value?.toUpperCase()))
                                    }
                                    renderMenu={(items, value, style ) => {
                                      return (
                                        <div style={{ 
                                          position: 'absolute', 
                                          borderRadius: '3px',
                                          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                          background: 'rgba(255, 255, 255, 0.9)',
                                          padding: '2px 0',
                                          fontSize: '90%',
                                          overflow: 'auto',
                                          marginTop: '5px',
                                          maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom 
                                        }} 
                                        children={items}
                                        />

                                      )
                                    }}
                                    renderItem={(item, isHighlighted) =>
                                      <div style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer', }}>
                                        {item}
                                      </div>
                                    }
                                    renderInput={(props) => {
                                      return (
                                        <div className="w-100">
                                          <input 
                                            style={{ width: '100%' }} 
                                            className={
                                              `form-control 
                                              ${typeof errorsData?.product_model !== 'undefined' ? 'is-invalid' : null }
                                              ${options.includes(answer.value) ? 'is-valid' : null }
                                              ${!options.includes(answer.value) && answer.value != '' ? 'is-invalid' : null }
                                            `}   
                                          {...props}/>
                                        </div> 
                                      )
                                    }
                                    }
                                    // open={options.filter(v => v.includes(answer?.value?.toUpperCase())).length > 0 ? true : false}
                                    value={answer.value}
                                    onChange={e => {
                                        const answer = e.target.value;
                                        setAnswers(currentAnswers => 
                                            produce(currentAnswers, v => {
                                                v[index] = {
                                                    value: answer,
                                                    status: '',
                                                }
                                            })
                                        );
                                    }}
                                    onSelect={(val) =>{
                                      const answer = val
                                      setAnswers(currentAnswers => 
                                          produce(currentAnswers, v => {
                                              v[index] = {
                                                  value: answer,
                                                  status: 'valid',
                                              }
                                          })
                                      );
                                    }}
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
                  <div className="d-flex flex-lg-row">
                    
                    <div className="px-1">
                      <button 
                          className="btn btn-add" 
                          type="button"
                          onClick={() => {
                              setAnswers(currentAnswers => [
                                  ...currentAnswers, { value: '' }
                              ])
                          }}
                      >
                          Add Product Model
                      </button>
                    </div>
                    <div className="ms-2">
                      <button 
                          className="btn btn-danger" 
                          type="button"
                          onClick={() => {
                              setAnswers([{ value: '', status: '' }])
                          }}
                      >
                          Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <div className="row">
              <div className="col-6">
                <Link to="/promo">
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
                  onClick={onSubmit}
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
            <ModalConfirm fetchAPI={fetchAPI} message={"There's Product Model That Not Registered, Are you Sure ?"} />
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