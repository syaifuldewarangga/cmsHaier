import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import './FormOtp.css'
import { useParams, useHistory } from "react-router-dom";
import { decode, encode } from "base-64";

const FormOtp = (props) => {
    const history = useHistory()
    const [errorData, setErrorData] = useState({
        otp: '',
        anyError: ''
    })
    const [otp, setOtp] = useState('')
    const { userID } = useParams()

    const onChangeInput = (e) => {
        setOtp(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        let userIdDecode = decode(userID)
        let formData = new FormData()
        formData.append('otp', otp)
        formData.append('userId', userIdDecode)

        await axios.post(props.base_url + 'forgot-password/otp', formData).then((res) => {
            let secureToken = encode(res.data.data.secureToken)
            history.push('/reset-password/' + userID + '/' + secureToken)
        }).catch((err) => {
            if(err.response !== undefined) {
                let responError = err.response.data.errors
                if(responError !== undefined) {
                    if(responError.location === 'otp') {
                        setErrorData({
                            ...errorData,
                            otp: responError.reason
                        })
                    }
                } else {
                    console.log(err.response)
                }   
            }
        })

    }
    return (
        <div className="container form-otp">
            <div className="col-lg-4 mx-auto" >
                <div className="card">
                    <div className="card-body">
                        <div className="text-center header">
                            <div className="title">
                                Enter Verification Code
                            </div>
                            <div className="sub-title">
                                The verification code has been sent via sms to the number
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3 mt-2">
                                <input
                                    type="number"
                                    class={`form-control ${errorData.otp !== '' ? 'is-invalid' : null}`}
                                    placeholder="Verification Code"
                                    onChange={onChangeInput}
                                />
                                <div className="invalid-feedback">
                                    { errorData.otp }
                                </div>
                            </div>
                            <div class="d-grid gap-2 mb-3 mt-4">
                                <button 
                                    class="btn btn-color-primary" 
                                    type="submit"
                                >
                                    Verification
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

export default  connect(mapStateToProps) (FormOtp)