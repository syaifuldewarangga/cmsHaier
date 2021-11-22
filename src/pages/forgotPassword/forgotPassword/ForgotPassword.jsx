import axios from "axios";
import { encode } from "base-64";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import './ForgotPassword.css'

const ForgotPassword = (props) => {
    const history = useHistory()
    const [phoneNumber, setPhoneNumber] = useState()
    const [errorData, setErrorData] = useState({
        phone_number: '',
        anyError: ''
    })

    const handleInput = (e) => {
        setPhoneNumber(e.target.value)
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        var formData = new FormData();
        formData.append('phone', "62" + phoneNumber );

        await axios.post(props.base_url + 'forgot-password', formData)
        .then((res) => {
            console.log(res)
            let user_id_encode = encode(res.data.data.userId)
            history.push('/otp/' + user_id_encode)
        }).catch((err) => {
            let responError = err.response.data.errors
            console.log(err.response)
            if(responError !== undefined) {
                if(responError.location === 'phone') {
                    setErrorData({
                        ...errorData,
                        phone_number: responError.reason
                    })
                }
                if(responError.location === 'user') {
                    setErrorData({
                        ...errorData,
                        anyError: 'your phone number not found'
                    })
                }
            }
        })
    }
    return (
        <div className="container forgot-password-page">
            <div className="col-lg-4 mx-auto" >
                <div className="card">
                    <div className="card-body">
                        <div className="text-center header">
                            <div className="title">
                                Password Reset
                            </div>
                            <div className="sub-title">
                                Enter your phone number
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ fontSize: 13, color: '#eb4d4b' }}>
                                { errorData.anyError }
                            </div>
                            <div class="mb-3 mt-2">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">+62</span>
                                    <input
                                        type="number"
                                        class={ `form-control ${errorData.phone_number !== '' ? 'is-invalid' : null}` }
                                        placeholder="Phone Number"
                                        onChange={handleInput}
                                    />
                                    <div className="invalid-feedback">
                                        {errorData.phone_number}
                                    </div>
                                </div>
                            </div>
                            <div class="d-grid gap-2 mb-3 mt-4">
                                <button 
                                    class="btn btn-color-primary" 
                                    type="submit"
                                >
                                    Continue
                                </button>
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
export default connect(mapStateToProps, null)  (ForgotPassword)