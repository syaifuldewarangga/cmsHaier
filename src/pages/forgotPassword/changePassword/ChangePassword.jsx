import axios from "axios";
import { decode } from "base-64";
import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import AlertModal from "../../../component/alertModal/AlertModal";
import './ChangePassword.css'

const ChangePassword = (props) => {
    const history = useHistory()
    const [errorData, setErrorData] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [data, setData] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const { userID,  tokenReset } = useParams()
    const [alertTitle, setAlertTitle] = useState({
        status: 'success',
        title: 'Success',
        subTitle: 'Your password has been changed successfully'
    })

    useEffect(() => {
        if(data.newPassword !== data.confirmPassword) {
            setErrorData({
                ...errorData,
                confirmPassword: 'password are not the same'
            })
        } else {
            setErrorData({
                ...errorData,
                confirmPassword: ''
            })
        }
    }, [data.confirmPassword])

    const alertModal = () => {
        let alertModal = new Modal(document.getElementById('alertModal'));
        alertModal.show();
    };

    const onChangeInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        let decodeUserId = decode(userID)

        formData.append('userId', decodeUserId)
        formData.append('password', data.newPassword)
        console.log(decode(tokenReset))

        if(data.newPassword === data.confirmPassword) {
            await axios.post(props.base_url + 'forgot-password/otp/change-password', formData, {
                headers: {
                    secureToken: decode(tokenReset)
                },
            }).then((res) => {
                localStorage.removeItem('token_reset_password')
                alertModal()
                const modal = document.getElementById('alertModal')
                modal.addEventListener('hidden.bs.modal', function (event) {
                    history.push('/')
                })
            }).catch((err) => {
                console.log(err.response)
                let responError = err.response.data.errors
                if(responError !== 'undefined') {
                    if(responError.location === 'password') {
                        setErrorData({
                            ...errorData,
                            newPassword: responError.reason
                        })
                    }
                } else {
                    console.log(err.response)
                }   
            })
        } else {
            setErrorData({
                ...errorData,
                confirmPassword: 'password are not the same'
            })
        }
    }

    return (
        <div className="container form-otp">
            <div className="col-lg-4 mx-auto" >
                <div className="card">
                    <div className="card-body">
                        <div className="text-center header">
                            <div className="title">
                                Enter New Password
                            </div>
                            <div className="sub-title">
                                The verification code has been sent via sms to the number
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3 mt-2">
                                <input
                                    type="password"
                                    name="newPassword"
                                    class={`form-control ${errorData.newPassword !== '' ? 'is-invalid' : null}`}
                                    placeholder="New Password"
                                    onChange={onChangeInput}
                                />
                                <div className="invalid-feedback">
                                    {errorData.newPassword}
                                </div>
                            </div>
                            <div class="mb-3 mt-2">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    class={`form-control ${errorData.confirmPassword !== '' ? 'is-invalid' : null}`}
                                    placeholder="Confirmation Password"
                                    onChange={onChangeInput}
                                />
                                <div className="invalid-feedback">
                                    {errorData.confirmPassword}
                                </div>
                            </div>
                            <div class="d-grid gap-2 mb-3 mt-4">
                                <button 
                                    class="btn btn-color-primary" 
                                    type="submit"
                                >
                                    Save Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <AlertModal data={alertTitle}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
}
export default connect(mapStateToProps, null) (ChangePassword)