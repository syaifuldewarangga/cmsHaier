import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const FormContactFooter = (props) => {
    const history = useHistory()
    const [errorData, setErrorData] = useState({
        address: '',
        phone: '',
        fax: '',
    })

    const [data, setData] = useState({
        address: '',
        phone: '',
        fax: '',
    })
    const token = localStorage.getItem('access_token')

    const getContactFromAPI = async () => {
        await axios.get(props.base_url + 'contact', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            console.log(res.data)
            setData({
                address: res.data.address,
                phone: res.data.phone,
                fax: res.data.fax
            })
        })
    }

    useEffect(() => {
        getContactFromAPI()
    }, [])

    const onChangeInput = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('address', data.address)
        formData.append('phone', data.phone)
        formData.append('fax', data.fax)
        await axios.put(props.base_url + 'contact', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            alert('berhasil')
            history.push('/setting/contact-footer')
        }).catch((err) => {
            console.log(err.response.data)
            if(err.response.data !== undefined) {
                let responError = err.response.data.errors;
                if(responError.location === 'address') {
                    setErrorData({
                        ...errorData,
                        address: err.response.data.message,
                    });
                }

                if(responError.location === 'phone') {
                    setErrorData({
                        ...errorData,
                        phone: err.response.data.message,
                    });
                }

                if(responError.location === 'fax') {
                    setErrorData({
                        ...errorData,
                        fax: err.response.data.message,
                    });
                }
            }
        })
        
    }

    return (
        <div className="form-contact-footer">
            <div className="card">
                <div className="card-header btn-import">
                    <h5 className="dashboard title" style={{ margin: '0', padding: '7px 0' }} >
                        Contact Footer Form
                    </h5>
                </div>

                <div className="card-body">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div class="mb-3">
                                    <label class="form-label">Address</label>
                                    <input 
                                        type="text" 
                                        name="address"
                                        class={`form-control ${errorData.address !== '' ? 'is-invalid' : null}`}
                                        value={data.address}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.address }
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Phone</label>
                                    <input 
                                        type="number" 
                                        name="phone"
                                        class={`form-control ${errorData.phone !== '' ? 'is-invalid' : null}`}
                                        value={data.phone}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.phone }
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Fax</label>
                                    <input 
                                        type="number" 
                                        name="fax"
                                        class={`form-control ${errorData.fax !== '' ? 'is-invalid' : null}`}
                                        value={data.fax}
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.fax }
                                    </div>
                                </div>
                                <div className="d-grid gap-2">
                                    <button class="btn btn-import" type="submit" > Save </button>
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
export default  connect(mapStateToProps, null) (FormContactFooter)