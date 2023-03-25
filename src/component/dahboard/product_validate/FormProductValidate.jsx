import React, { useState, useEffect, useMemo } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment';
import { produce } from "immer";
import readXlsxFile from 'read-excel-file';
import Autocomplete from 'react-autocomplete';
import ModalConfirm from './ModalConfirm';
import { Modal } from 'bootstrap';
import { format } from 'date-fns';
import { client_id, client_secret, grant_type } from '../../../variable/GlobalVariable';
var X2JS = require('x2js');

const convertCategoryGSIS = (value) => {
  const Freezer = ['Showcase', 'Freezer']
  const Washing_Machine = ['Mesin Cuci Twin Tube', 'Mesin Cuci Top Load']
  const Small_Appliances = ['Blender and Juicer', 'Electric Kettle', 'Microwave', 'Rice Cooker', 'Vacuum Cleaner', 'Travel Cooker', 'Electric Fan', 'Cooker Hood', 'Kompor']
  if(Freezer.includes(value)) return 'Freezer'
  if(Washing_Machine.includes(value)) return 'Washing Machine'
  if(Small_Appliances.includes(value)) return 'Small Appliances'
  return value
}

const FormProductValidate = (props) => {
    const xtojson = new X2JS();
    const [form, setForm] = useState({
        invoice: '',
        warranty: '',
        serial: '',
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
    const [isLoading2, setIsLoading2] = useState(false)
    const [options, setOptions] = useState([])
    const { id } = useParams();
    const [image, setImage] = useState({
      warranty : '',
      invoice : '', 
      serial : '' 
    })
    

    const getOptions = async () => {
      // const url = `${props.base_url}extended-warranty-promo/wms?product_model=`
      const url = `${props.base_url}product-model-all`
      const res = await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
      })
      const { data } = res;
      // console.log(data.product_model_list)
      setOptions(data.product_model_list)
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
                [e.target.name]: e.target.value
            })
        }
        
    }

    const checkProductModel = () => {
      return options.includes(form.product_model)
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

    const handleImage = (e) => {
      const file =  e.target.files[0];
      if(!!file){
        const fileUrl = URL.createObjectURL(file)
        setImage({
          ...image,
          [e.target.name]: file
        })
        setForm({
          ...form,
          [e.target.name]: fileUrl
        })
      }
    }

    const fetchAPI = () => {
        setIsLoading(true)
        const userData = props.data.customer
        // console.log(userData)
        const formdata = new FormData();
        formdata.append('customer_id', id);
        formdata.append('serial_number', form.barcode);
        formdata.append('barcode', form.barcode);
        formdata.append('product_name', form.product_model);
        formdata.append('date', format(new Date(form.date), 'MM/dd/yyyy'));
        formdata.append('store_location', form.store_location);
        formdata.append('store_name', form.store);
        formdata.append('email', userData.email);
        formdata.append('phone', userData.phone);
        formdata.append('product_model', form.product_model);
        if(image.warranty !== ''){
          formdata.append( 'warranty_card', image.warranty);
        }
        if(image.invoice !== ''){
          formdata.append('invoice', image.invoice);
        }
        if(image.serial !== ''){
          formdata.append('serial', image.serial);
        }
        formdata.append('brand', form.brand);
        formdata.append('category', form.category);

        // console.log(Object.fromEntries(formData))
        var token = localStorage.getItem('access_token');
        const modalExist = document.getElementById('modalConfirm') 
        if(props.title === 'Edit Product Validate'){
            //Update
            formdata.append('id', id);
            axios.put(props.base_url + 'register-product/plain', formdata, {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }).then(res => {
              // console.log(res.data)
              setIsLoading(false)
              if(res.data.code == 200){
                alert('Berhasil Edit')
                
              }
            }).catch(err => {
              // console.log(err.response)
            }).finally(() => {
              setIsLoading(false)
            })

        }
        // console.log(Object.fromEntries(formdata))

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
      let mounted = true
      if(mounted && options.length == 0){
        getOptions()
      }


      return () => mounted = false
    }, [options.length])

    const [dataStore, setDataStore] = useState([]);
    const [errorStore, setErrorStore] = useState('');
    async function fetchDataStore(gtmToken) {
      try{
        const res = await axios.post(props.gtm_url + 'pmtcommondata/GetStoreListByCondition',
            {
              StoreID: '',
              StoreName: '',
              StoreCode: '',
            },
            {
              headers: {
                Authorization: "Bearer " + gtmToken,
              },
            }
        )
        setDataStore(res.data.data);
        return res
      }catch(e){
          if (e.response) {
            // console.log(e.response);
          } else if (e.request) {
            // console.log('request : ' + e.request);
          } else {
            // console.log('message : ' + e.message);
          }
      }
    }
    const getTokenGTM = async () => {
      const { data: { access_token } } = await axios.post(props.gtm_token_url, {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: grant_type,
      })
      const temp =  await fetchDataStore(access_token)
      // console.log(temp)
      return temp
    }

    let newDataStore = useMemo(() => {
      return dataStore.map(({ StoreName }) => StoreName)
    }, [dataStore]);

    useEffect(() => {
        // console.log(props.data)
        let m = true
        if(m){
          getTokenGTM().then(res => {
            if(props.data){
              let { data } = props
              // console.log(data)
              setForm({
                  ...form,
                  invoice: props.image_url + data.invoice,
                  warranty: props.image_url + data.warranty_card,
                  serial: props.image_url + data.serial,
                  barcode: data.barcode,
                  category: data.category,
                  date: moment(data.date).format('yyyy-MM-DD'),
                  brand: data.brand,
                  product_model: data.product_model,
                  store: data.store_name,
                  store_location: data.store_location,
              })
            }
          })
        }
    }, [id])

    const handleApprove = async (dataId) => {
      var token = localStorage.getItem('access_token');
      const res = await axios.patch(props.base_url + 'register-product/plain/status', {}, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
            params: {
              registered_product_id: dataId,
              status: 'APPROVED',
          }
      })
      // console.log(res.data)
      if(res.data.code == 200){
        alert('Berhasil Approve Data');
        history.push('/product-validate/list');
      }
      // hideModal()
      // fetchData()
    }

    const deleteProduct = async (productID) => {
      var token = localStorage.getItem('access_token');
      await axios.delete(props.base_url + 'register-product/product', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          id: productID
        }
      }).then(() => {
        // console.log('success delete')
        alert('Failed Send to Gsis')
      }).catch((error) => {
        // console.log(error.response)
      }).finally(() => {
        setIsLoading2(false)
      })
    }
    
    const [errorGsis, setErrorGSIS] = useState('')
    const postToGSIS = async () => {
      setIsLoading2(true)
      let formGSIS = new FormData()
      const dataUser = props.data.customer
      formGSIS.append('id', id)
      formGSIS.append('country', 'Indonesia')
      formGSIS.append('firstName', dataUser.first_name)
      formGSIS.append('lastName', dataUser.last_name)
      formGSIS.append('mobilePhone', dataUser.phone)
      formGSIS.append('email', dataUser.email)
      formGSIS.append('address', dataUser.address)
      formGSIS.append('AddressId', "")
      formGSIS.append('City', dataUser.city)
      formGSIS.append('State', dataUser.district)
      formGSIS.append('Street', dataUser.sub_district)
      formGSIS.append('brand', form.brand)
      formGSIS.append('category', convertCategoryGSIS(form.category));
      formGSIS.append('productModel', form.product_model);
      formGSIS.append('serialNum', form.barcode);
      formGSIS.append('purchaseDate', format(new Date(form.date), 'MM/dd/yyyy'));
      let invoiceURL = props.image_url + form.invoice
      formGSIS.append('Invoiceattachment', invoiceURL);
      let attachmentURL = props.image_url + form.warranty
      formGSIS.append('Warrantyattachment', attachmentURL);
      formGSIS.append('whatsappflag', props.data.agreements === 'Y' ? 'Y' : 'N');
      // console.table(Object.fromEntries(formGSIS))
      // setIsLoading2(false)

      await axios.post(props.gsis_url + 'hatprodreg', formGSIS, {
        headers: {
          Accept: 'application/xml',
        }
      }).then((res) => {
        let response = xtojson.xml2js(res.data)
        let errorCode = response.Envelope.Body.HESAProdRegResponse.Error_spcCode
        // console.log(errorCode)
        if(errorCode === '0') {
          handleApprove(id)
        } else {
          alert('Failed Send to GSIS')
          setIsLoading2(false)
          setErrorGSIS(response.Envelope.Body.HESAProdRegResponse.Error_spcMessage)
          // console.log(response.Envelope.Body.HESAProdRegResponse.Error_spcMessage)
        } 
      }).catch((err) => {
        // deleteProduct(id)
        // console.log(err.response)
      }).finally(() => {
      });
    }

    const PostToGCC = async () => {
      setIsLoading2(true)
      const dataUser = props.data?.customer
      try {
        var token = localStorage.getItem('access_token');
        const params = {
            RegisterProductId: id,
            Status: "APPROVED",
            FirstName: dataUser.first_name,
            LastName: dataUser.last_name,
            Gender: dataUser.gender == "Perempuan" ? 1 : 0,
            BirthDate: dataUser.birth_date,
            LocationStateCode: dataUser.province,
            LocationStateName: dataUser.province,
            LocationCityCode: dataUser.city,
            LocationCityName: dataUser.city,
            LocationLocalityCode: dataUser.district,
            LocationLocalityName: dataUser.district,
            Address: dataUser.address,
            Telphone: dataUser.phone,
            OfficePhone: dataUser.phone_office,
            DealerName: "Test",
            EwarrantyInfo: "test ewarranty info",
            BrandCode: "test",
        };
        const res = await axios.patch(props.base_url + 'v2/register-service/product/status', {}, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
            params
        })
        if(res.data.code == 200){
          alert('Berhasil Approve Data');
          history.push('/product-validate/list');
        }
        // hideModal()
        // fetchData()
   
      } catch (err) {
        // console.log(err.response)
        alert('Gagal Approve Data');
        if(err.response)setErrorStore(err.response?.data?.errors.location)
      } finally {
        setIsLoading2(false)
      }
    }
    return (
      <div>
        <div className="form-user">
          <div className="card ">
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
                        name="barcode"
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
                        disabled
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
                            options.filter(opt => opt).filter(v => v.includes(form.product_model.toUpperCase()))
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
                        name='barcode'
                        className={`form-control ${
                            typeof errorsData?.barcode !== 'undefined' ? 'is-invalid' : null
                        }`}
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
                      <select 
                        onChange={onChangeData}
                        value={form.category}
                        required className="form-select" name="category" placeholder='choose brand'
                      >
                        <option value='' disabled>Choose One Category</option>
                        <option value="Refrigerator">Kulkas</option>
                        <option value="Freezer">Freezer</option>
                        <option value="Showcase">Showcase</option>
                        <option value="Mesin Cuci Twin Tube">Mesin Cuci Twin Tube</option>
                        <option value="Mesin Cuci Top Load">Mesin Cuci Top Load</option>
                        <option value="Drum Washing Machine">Mesin Cuci Front Load</option>
                        <option value="TV">LED TV</option>
                        <option value="Home Air Conditioner">Air Conditioner</option>
                        <option value="Blender and Juicer">Blender and Juicer</option>
                        <option value="Electric Kettle">Electric Kettle</option>
                        <option value="Microwave">Microwave</option>
                        <option value="Rice Cooker">Rice Cooker</option>
                        <option value="Vacuum Cleaner">Vacuum Cleaner</option>
                        <option value="Travel Cooker">Travel Cooker</option>
                        <option value="Electric Fan">Electric Fan</option>
                        <option value="Commercial Air Conditioner">Commercial Air Conditioner</option>
                        <option value="Water Heater">Water Heater</option>
                        <option value="Cooker Hood">Cooker Hood</option>
                        <option value="Kompor">Kompor</option>
                      </select>  
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
                        name="date"
                        onChange={onChangeData}
                        value={form.date}
                        required
                      />
                      <div className="invalid-feedback">{errorsData.date}</div>
                    </div>
                  </div>

                  {/* Store - Store Location */}
                  <div className="col-lg-6">
                    <div className="mb-lg-5 mb-4">
                      <label htmlFor="store-location" className="form-label">
                        Store Name
                      </label>
                        <Autocomplete
                          wrapperStyle={{ width:'100%' }}
                          getItemValue={(item) => item}
                          items={
                              newDataStore.filter(v => v.includes(form.store.toLocaleUpperCase()))
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
                              <div style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer', padding: '1px' }}>
                                  {item}
                              </div>
                          }
                          renderInput={(props) => {
                            return (
                              <div className="w-100">
                                <input 
                                  style={{ width: '100%' }} 
                                  className={
                                    `form-control`}   
                                {...props}
                                />
                              </div> 
                            )
                          }
                          }
                          
                          value={form.store}
                          onChange={e => {
                              const store = e.target.value;
                              setForm({
                                  ...form,
                                  store
                              })
                          }}
                          onSelect={(val) =>{
                              const store = val
                              let isi = dataStore.filter((word) => word.StoreName === store);
                              if(isi.length > 0){
                                setForm({
                                  ...form,
                                  store: store,
                                  store_location: isi[0].Street
                                })
                              }
                              // setForm({
                              //     ...form,
                              //     store,
                              //     store_location,
                              // })
                          }}
                        />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-lg-5 mb-4">
                      <label htmlFor="store-location" className="form-label">
                        Store Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="store-location"
                        value={form.store_location}
                        disabled
                      />
                    </div>
                  </div>

                  {/* warranty card invoice serial */}
                  <div className="col-lg-12 mb-5">
                    <div className="row mb-5">
                      <div className="col-lg-4 mb-5">
                          <div className="h-100">
                              <p className="form-label">Warranty Card</p>
                              <div className="d-flex flex-column h-100">
                                <img src={form.warranty} className="img-fluid mb-auto" />
                                <div className="gap-2 w-100 align-items-center d-flex justify-content-between ">
                                  <label
                                    className="btn btn-sm btn-success flex-grow-1"
                                    htmlFor='warranty'
                                  >
                                    <span class="material-icons-outlined md-18">edit</span>
                                  </label>
                                  <a href={form.warranty} target='_blank' className='flex-grow-1 btn btn-sm btn-outline-success'>
                                      View Image
                                  </a>
                                </div>
                                <input onChange={handleImage} type="file" name="warranty" id="warranty" hidden />
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-4  mb-5">
                          <div className="h-100">
                              <p className="form-label">Invoice</p>
                              <div className="d-flex flex-column h-100">
                                <img src={form.invoice} className="img-fluid mb-auto" />
                                <div className="gap-2 w-100 align-items-center d-flex justify-content-between ">
                                  <label
                                    className="btn btn-sm btn-success flex-grow-1"
                                    htmlFor='invoice'
                                  >
                                    <span class="material-icons-outlined md-18">edit</span>
                                  </label>
                                  <a href={form.invoice} target='_blank' className='flex-grow-1 btn btn-sm btn-outline-success'>
                                      View Image
                                  </a>
                                </div>
                                <input onChange={handleImage} type="file" name="invoice" id="invoice" hidden />
                              </div>
                          </div>
                      </div>      
                      <div className="col-lg-4 mb-5">
                          <div className="h-100">
                              <p className="form-label">Serial</p>
                              <div className="d-flex flex-column h-100">
                                <img src={form.serial} className="img-fluid mb-auto" />
                                <div className="gap-2 w-100 align-items-center d-flex justify-content-between ">
                                  <label
                                    className="btn btn-sm btn-success flex-grow-1"
                                    htmlFor='serial'
                                  >
                                    <span class="material-icons-outlined md-18">edit</span>
                                  </label>
                                  <a href={form.serial} target='_blank' className='flex-grow-1 btn btn-sm btn-outline-success'>
                                      View Image
                                  </a>
                                </div> 
                                
                                <input onChange={handleImage} type="file" name="serial" id="serial" hidden />
                              </div>
                          </div>
                      </div>  
                    </div>

                  </div>
              </div>

              <div className="row">
                <div className="text-danger" style={{ fontSize: 14 }}>
                  {errorStore}
                </div>
              </div>
              <div className="row gap-2 justify-content-between">
                <div className="col-md-4 col-sm-12 ">
                  <Link to="/promo">
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-danger" type="button">
                        Cancel
                      </button>
                    </div>
                  </Link>
                </div>
                <div className="d-grid gap-2 col-md-4 col-sm-12">
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
                </div>
                <div className="d-grid gap-2 col-md-3 col-sm-12">
                  <button 
                    className="btn btn-outline-import " 
                    type="button" 
                    disabled={isLoading2 && 'disabled'}
                    onClick={PostToGCC}
                  >
                    {
                      isLoading2 ?
                      <Fragment>
                          <span class="spinner-border spinner-border-sm me-1  " role="status" aria-hidden="true"></span>
                          Loading...
                      </Fragment> :
                      props.title === 'Edit Product Validate' ? 'Approve' : 'Create'
                    }
                  </button>
                </div>
              </div>
              <ModalConfirm fetchAPI={postToGSIS} message={"There's Product Model That Not Registered, Are you Sure ?"} />
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
      gtm_url: state.GTM_URL,
      token: state.GTM_TOKEN,
      gsis_url: state.GSIS_URL,
      gtm_token_url: state.GTM_TOKEN_URL,
      oapi_url: state.OAPI_URL
    };
  };
  
  export default connect(mapStateToProps, null)(FormProductValidate);