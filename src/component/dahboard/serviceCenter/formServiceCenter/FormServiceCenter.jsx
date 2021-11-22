import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

const FormServiceCenter = (props) => {
    const history = useHistory()
    const open_day_data = [
        'Senin - Jumat',
        'Senin - Sabtu',
        'Senin - Minggu',
    ]
    const close_day_data = [
        'Sabtu, Minggu, Hari Libur Nasional',
        'Minggu, Hari Libur Nasional',
        'Hari Libur Nasional',
    ]
    const [errorData, setErrorData] = useState({
        service_center_name: '',
        phone_office: '',
        province: '',
        city: '',
        district: '',
        postal_code: '',
        address: '',
        open_day: '',
        close_day: '', 
        open_hour: '',
        close_hour: '',
        latitude: '',
        longitude: '',
    })
    const [data, setData] = useState({
        service_center_name: '',
        phone_office: '',
        province: '',
        city: '',
        district: '',
        postal_code: '',
        address: '',
        open_day: '',
        close_day: '', 
        open_hour: '',
        close_hour: '00:00',
        latitude: '',
        longitude: '',
    })
    const [province, setProvince] = useState([])
    const [city, setCity] = useState([])

    const token = localStorage.getItem('access_token');

    const getProvinceFromAPI = async () => {
        await axios.get(props.base_url + 'location')
        .then((res) => {
            setProvince(res.data);
        })
    }

    const getCityFromAPI = async (province) => {
        await axios.get(props.base_url + 'location/city', {
            params: {
                prov_name: province,
            },
        })
        .then((res) => {
            setCity(res.data);
        });
    };

    let { id } = useParams()
    const getServiceCenterFromAPI = async () => {
        await axios.get(props.base_url + 'service-center/get', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                id: id
            }
        }).then((res) => {
            let newPhone = res.data.phone_office.toString();
            setData({
                service_center_name: res.data.service_center_name,
                phone_office: newPhone.slice(2),
                province: res.data.province,
                city: res.data.city,
                district: res.data.district,
                postal_code: res.data.postal_code,
                address: res.data.address,
                open_day: res.data.open_day,
                close_day: res.data.close_day, 
                open_hour: res.data.open_hour,
                close_hour: res.data.close_hour,
                latitude: res.data.latitude,
                longitude: res.data.longitude,
            })

            getCityFromAPI(res.data.province)
        }).catch((e) => {
            console.log(e.response.data)
        })
    }

    useEffect(() => {
        if(props.title === 'Edit Service Center') {
            getServiceCenterFromAPI()
        }
        getProvinceFromAPI()
    }, [])

    const onChangeInput = (e) => {
        if (e.target.name === 'province') {
            getCityFromAPI(e.target.value);
        }
        if(e.target.name === 'phone_office') {
            setData({
                ...data,
                [e.target.name]: parseInt(e.target.value, 10)
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleErrorSubmit = (error) => {
        if(error !== undefined) {
            let errorResponse = error.errors
            if(errorResponse.location === 'service_center_name') {
                setErrorData({
                    ...errorData,
                    service_center_name: error.message
                })
            }
            if(errorResponse.location === 'phone_office') {
                setErrorData({
                    ...errorData,
                    phone_office: error.message
                })
            }
            if(errorResponse.location === 'province') {
                setErrorData({
                    ...errorData,
                    province: error.message
                })
            }
            if(errorResponse.location === 'city') {
                setErrorData({
                    ...errorData,
                    city: error.message
                })
            }
            if(errorResponse.location === 'district') {
                setErrorData({
                    ...errorData,
                    district: error.message
                })
            }
            if(errorResponse.location === 'postal_code') {
                setErrorData({
                    ...errorData,
                    postal_code: error.message
                })
            }
            if(errorResponse.location === 'address') {
                setErrorData({
                    ...errorData,
                    address: error.message
                })
            }
            if(errorResponse.location === 'open_day') {
                setErrorData({
                    ...errorData,
                    open_day: error.message
                })
            }
            if(errorResponse.location === 'close_day') {
                setErrorData({
                    ...errorData,
                    close_day: error.message
                })
            }
            if(errorResponse.location === 'open_hour') {
                setErrorData({
                    ...errorData,
                    open_hour: error.message
                })
            }
            if(errorResponse.location === 'close_hour') {
                setErrorData({
                    ...errorData,
                    close_hour: error.message
                })
            }
            if(errorResponse.location === 'latitude') {
                setErrorData({
                    ...errorData,
                    latitude: error.message
                })
            }
            if(errorResponse.location === 'longitude') {
                setErrorData({
                    ...errorData,
                    longitude: error.message
                })
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('service_center_name', data.service_center_name)
        formData.append('phone_office', '62' + data.phone_office)
        formData.append('province', data.province)
        formData.append('city', data.city)
        formData.append('district', data.district)
        if(data.postal_code !== null) { 
            formData.append('postal_code', data.postal_code)
        }
        formData.append('address', data.address)
        formData.append('open_day', data.open_day)
        formData.append('close_day', data.close_day)
        formData.append('open_hour', data.open_hour)
        formData.append('close_hour', data.close_hour)
        formData.append('latitude', data.latitude)
        formData.append('longitude', data.longitude)
        if(props.title === 'Edit Service Center') {
            formData.append('id', id)
            await axios.put(props.base_url + 'service-center', formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }).then((res) => {
                alert('berhasil')
                history.push('/service-center/list')
            }).catch((err) => {
                let error = err.response.data
                console.log(error)
                // handleErrorSubmit(error)
            })
        } else {
            await axios.post(props.base_url + 'service-center', formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }).then((res) => {
                alert('berhasil')
                history.push('/service-center/list')
            }).catch((err) => {
                let error = err.response.data
                console.log(error)
                handleErrorSubmit(error)
            })
        }
    }

    return  (
        <div className="form-service-center">
            <div className="card">
                <div className="card-header btn-import">
                    <h5 className="dashboard title" style={{ margin: '0', padding: '7px 0' }} >
                        { props.title }
                    </h5>
                </div>

                <div className="card-body">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">Service Center Name</label>
                                    <input 
                                        type="text" 
                                        class={`form-control ${errorData.service_center_name !== '' ? 'is-invalid' : null} `}
                                        name="service_center_name"
                                        value={data.service_center_name}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.service_center_name }
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">Phone Office</label>
                                    <div className="input-group">
                                        <span class="input-group-text" id="basic-addon1">+62</span>
                                        <input 
                                            type="number" 
                                            class={`form-control ${errorData.phone_office !== '' ? 'is-invalid' : null} `}
                                            name="phone_office"
                                            value={data.phone_office}
                                            onChange={onChangeInput}
                                        />
                                        <div className="invalid-feedback">
                                            { errorData.phone_office }
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">Province</label>
                                    <select
                                        class={`form-select ${ errorData.province !== '' ? 'is-invalid' : null }`}
                                        name="province"
                                        onChange={onChangeInput}
                                    >
                                    <option selected disabled>
                                        -- Select Province --
                                    </option>
                                    {province.map(function (item, i) {
                                        return (
                                        <option
                                            value={item.prov_name}
                                            key={i}
                                            selected={ data.province === item.prov_name ? 'selected' : null }
                                        >
                                            {item.prov_name}
                                        </option>
                                        );
                                    })}
                                    </select>
                                    <div className="invalid-feedback">
                                        {errorData.province}
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">City</label>
                                    <select
                                        class={`form-select ${ errorData.city !== '' ? 'is-invalid' : null }`}
                                        name="city"
                                        onChange={onChangeInput}
                                        disabled={data.province === '' ? 'disabled' : null}
                                    >
                                    <option selected disabled> -- Select City -- </option>
                                    {city.map(function (item, i) {
                                        return (
                                        <option
                                            value={item.city_name}
                                            key={i}
                                            selected={ data.city === item.city_name ? 'selected' : null }
                                        >
                                            {item.city_name}
                                        </option>
                                        );
                                    })}
                                    </select>
                                    <div className="invalid-feedback">
                                        {errorData.city}
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">District</label>
                                    <input 
                                        type="text" 
                                        class={`form-control ${errorData.district !== '' ? 'is-invalid' : null} `}
                                        name="district"
                                        value={data.district}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.district }
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">Postal Code</label>
                                    <input 
                                        type="number" 
                                        class={`form-control ${errorData.postal_code !== '' ? 'is-invalid' : null} `}
                                        name="postal_code"
                                        value={data.postal_code}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.postal_code }
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <div class="mb-3">
                                        <label class="form-label">Address</label>
                                        <textarea
                                            class={`form-control ${ errorData.address !== '' ? 'is-invalid' : null }`}
                                            rows="6"
                                            name="address"
                                            value={data.address}
                                            onChange={onChangeInput}
                                        >
                                            {data.address}
                                        </textarea>
                                        <div className="invalid-feedback">
                                            {errorData.address}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">Open Day</label>
                                    <select
                                        class={`form-select ${ errorData.open_day !== '' ? 'is-invalid' : null }`}
                                        name="open_day"
                                        onChange={onChangeInput}
                                    >
                                        <option selected disabled> -- Select Open Day -- </option>
                                        {open_day_data.map(function (item, i) {
                                            return (
                                            <option
                                                value={item}
                                                key={i}
                                                selected={ data.open_day === item ? 'selected' : null }
                                            >
                                                {item}
                                            </option>
                                            );
                                        })}
                                    </select>
                                    <div className="invalid-feedback">
                                        {errorData.open_day}
                                    </div>
                                </div>   

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">Close Day</label>
                                    <select
                                        class={`form-select ${ errorData.close_day !== '' ? 'is-invalid' : null }`}
                                        name="close_day"
                                        onChange={onChangeInput}
                                    >
                                        <option selected disabled> -- Select Close Day -- </option>
                                        {close_day_data.map(function (item, i) {
                                            return (
                                            <option
                                                value={item}
                                                key={i}
                                                selected={ data.close_day === item ? 'selected' : null }
                                            >
                                                {item}
                                            </option>
                                            );
                                        })}
                                    </select>
                                    <div className="invalid-feedback">
                                        {errorData.close_day}
                                    </div>
                                </div>   
                                

                                <div className="col-lg-12 mb-3">
                                    <label class="form-label">Operational Hour</label>
                                    <input 
                                        type="text" 
                                        class={`form-control ${errorData.open_hour !== '' ? 'is-invalid' : null} `}
                                        name="open_hour"
                                        value={data.open_hour}
                                        onChange={onChangeInput}
                                        max="50"
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.open_hour }
                                    </div>
                                </div>

                                {/* <div className="col-lg-6 mb-3">
                                    <label class="form-label">Close Hour</label>
                                    <input 
                                        type="time" 
                                        class={`form-control ${errorData.close_hour !== '' ? 'is-invalid' : null} `}
                                        name="close_hour"
                                        value={data.close_hour}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.close_hour }
                                    </div>
                                </div> */}

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">Latitude</label>
                                    <input 
                                        type="text" 
                                        class={`form-control ${errorData.latitude !== '' ? 'is-invalid' : null} `}
                                        name="latitude"
                                        value={data.latitude}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.latitude }
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label class="form-label">Longitude</label>
                                    <input 
                                        type="text" 
                                        class={`form-control ${errorData.longitude !== '' ? 'is-invalid' : null} `}
                                        name="longitude"
                                        value={data.longitude}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.longitude }
                                    </div>
                                </div>
                                
                                <div className="col-lg-6">
                                    <Link to="/service-center/list">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-outline-import" type="button" > 
                                            Cancel
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                                <div className="d-grid gap-2 col-lg-6">
                                    <button className="btn btn-import" type="submit" > 
                                        {props.title === 'Edit Service Center' ? 'Save' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
}

export default  connect(mapStateToProps) (FormServiceCenter)