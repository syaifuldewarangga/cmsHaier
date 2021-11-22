import axios from "axios";
import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import AlertModal from "../../alertModal/AlertModal";

const ResetPasswordAdmin = (props) => {
    const history = useHistory()
    const [errorData, setErrorData] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [messageAlert, setMessageAlert] = useState({
        status: 'success',
        title: 'Success',
        subTitle: 'your password has been changed successfully',
    });
    const [data, setData] = useState({
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if(data.newPassword !== data.confirmPassword) {
            setErrorData({
                ...errorData,
                confirmPassword: 'password and confirm password are not the same'
            })
        }  else {
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
        var token = localStorage.getItem('access_token')
        let userID = localStorage.getItem('id')
        let formData = new FormData()
        formData.append('userId', userID)
        formData.append('password', data.newPassword)

        await axios.put(props.base_url + 'user/password', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            alertModal();
            let modal = document.getElementById('alertModal')
            modal.addEventListener('hide.bs.modal', function (event) {
                history.push('/dashboard')    
            })
        }).catch((err) => {
            let data = err.response;
            console.log(err.response);
            if (data !== undefined) {
                let responError = err.response.data;
                if (responError.errors.location === 'password') {
                    setErrorData({
                        ...errorData,
                        newPassword: responError.message,
                    });
                }
            }
        })
    }

    

    return (
        <div className="form-reset-passwrod-admin col-lg-6 col-12 m-auto">
            <div className="card">
                <div className="card-header btn-import">
                    <h5 className="dashboard title" style={{ margin: '0', padding: '7px 0' }} >
                        Reset Password
                    </h5>
                </div>

                <div className="card-body">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="col-12 mb-3">    
                                <div class="mb-3">
                                    <label class="form-label">New Password</label>
                                    <input 
                                        type="password" 
                                        class={`form-control ${errorData.newPassword !== '' ? 'is-invalid' : null} `}
                                        name="newPassword"
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.newPassword }
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        class={`form-control ${errorData.confirmPassword !== '' ? 'is-invalid' : null} `}
                                        name="confirmPassword"
                                        onChange={onChangeInput}
                                    />
                                    <div className="invalid-feedback">
                                        { errorData.confirmPassword }
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
            <AlertModal data={messageAlert} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
}

export default  connect(mapStateToProps) (ResetPasswordAdmin)