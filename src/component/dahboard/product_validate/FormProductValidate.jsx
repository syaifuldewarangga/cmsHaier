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
import { format } from 'date-fns';
const FormProductValidate = (props) => {
    const [form, setForm] = useState({
        invoice: '',
        warranty: '',
        barcode: '',
        brand: '',
        product_model: '',
        category: '',
        date: '',
        store: '',
        store_location: '',
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
        formData.append('barcode', form.barcode);
        formData.append('category', form.category);
        formData.append('brand', form.brand);
        formData.append('product_model', form.product_model);
        // console.log(Object.fromEntries(formData))
        var token = localStorage.getItem('access_token');
        const modalExist = document.getElementById('modalConfirm') 
        if(props.title === 'Edit Product Validate'){
            //Update
            formData.append('id', form.id);
            

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
            let { data } = props
            setForm({
                ...form,
                invoice: data.invoice,
                warranty: data.warranty,
                barcode: data.barcode,
                category: data.category,
                brand: data.brand,
                product_model: data.product_model,
                store:  data.store,
                store_location: data.store_location,
                date: data.date,
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
        <div className="card vh-100">
          <div className="card-header btn-import">
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

                {/* Barcode - brand */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Barcode</label>
                    <input
                      type="text"
                      className={`form-control ${
                          typeof errorsData?.barcode !== 'undefined' ? 'is-invalid' : null
                      }`}
                      aria-label="barcode"
                      onChange={onChangeData}
                      value={form.barcode}
                      required
                    />
                    <div className="invalid-feedback">{errorsData.barcode}</div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <input
                      type="text"
                      className={`form-control ${
                          typeof errorsData?.brand !== 'undefined' ? 'is-invalid' : null
                      }`}
                      aria-label="barcde"
                      onChange={onChangeData}
                      value={form.brand}
                      required
                    />
                    <div className="invalid-feedback">{errorsData.brand}</div>
                  </div>
                </div>

                {/* product model - serial number */}
                <div className="col-lg-6">
                  <label className="form-label">Product Model</label>
                  <Autocomplete
                      wrapperStyle={{ width:'100%' }}
                      getItemValue={(item) => item}
                      items={
                          options.filter(v => v.includes(form.product_model.toUpperCase()))
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
                                      ${options.length !== 0 && options.includes(form.product_model) ? 'is-valid' : null }
                                      ${options.length !== 0 && !options.includes(form.product_model) && form.product_model != '' ? 'is-invalid' : null }
                                  `}   
                                  {...props}/>
                              </div> 
                          )
                      }
                      }
                      // open={options.filter(v => v.includes(answer?.value?.toUpperCase())).length > 0 ? true : false}
                      value={form.product_model}
                      onChange={e => {
                          const product_model = e.target.value;
                          setForm({
                              ...form,
                              product_model
                          })
                      }}
                      onSelect={(val) =>{
                          const product_model = val
                          setForm({
                              ...form,
                              product_model
                          })
                      }}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Serial Number</label>
                    <input
                      type="text"
                      className={`form-control ${
                          typeof errorsData?.barcode !== 'undefined' ? 'is-invalid' : null
                      }`}
                      aria-label="barcde"
                      onChange={onChangeData}
                      value={form.barcode}
                      required
                    />
                    <div className="invalid-feedback">{errorsData.barcode}</div>
                  </div>
                </div>

                {/* category - date */} 
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className={`form-control ${
                          typeof errorsData?.category !== 'undefined' ? 'is-invalid' : null
                      }`}
                      aria-label="category"
                      onChange={onChangeData}
                      value={form.category}
                      required
                    />
                    <div className="invalid-feedback">{errorsData.category}</div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Date of Purchase</label>
                    <input
                      type="date"
                      max={format(new Date(), 'yyyy-MM-dd')}
                      className={`form-control ${
                          typeof errorsData?.date !== 'undefined' ? 'is-invalid' : null
                      }`}
                      aria-label="date"
                      onChange={onChangeData}
                      value={form.date}
                      required
                    />
                    <div className="invalid-feedback">{errorsData.date}</div>
                  </div>
                </div>

                {/* Store - Store Location */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Store</label>
                    <input
                      type="text"
                      className={`form-control ${
                          typeof errorsData?.store !== 'undefined' ? 'is-invalid' : null
                      }`}
                      aria-label="store"
                      onChange={onChangeData}
                      value={form.store}
                      required
                    />
                    <div className="invalid-feedback">{errorsData.store}</div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Store Location</label>
                    <input
                      type="text"
                      className={`form-control ${
                          typeof errorsData?.store_location !== 'undefined' ? 'is-invalid' : null
                      }`}
                      aria-label="store_location"
                      onChange={onChangeData}
                      value={form.store_location}
                      required
                    />
                    <div className="invalid-feedback">{errorsData.store_location}</div>
                  </div>
                </div>

                {/* Invoice dan warranty card */}
                <div className="col-lg-6">
                    <div className="mb-3">
                        <p className="form-label">Invoice</p>
                        <a href={form.invoice} target='_blank'>
                            <button className='btn btn-primary btn-sm'>
                                View Invoice
                            </button>
                        </a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-3">
                        <p className="form-label">Warranty Card/Serial Number</p>
                        <a href={form.warranty} target='_blank'>
                            <button className='btn btn-primary btn-sm'>
                                View Warranty/Serial Number
                            </button>
                        </a>
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
                    props.title === 'Edit Product Validate' ? 'Save' : 'Create'
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
  
  export default connect(mapStateToProps, null)(FormProductValidate);