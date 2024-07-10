import axios from "axios";
import { Modal } from "bootstrap";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useToken from "../../../hooks/useToken";

const ModalResetPassword = ({ id }) => {
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const history = useHistory();
    const { token } = useToken()

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    const hideModalResetPassword = () => {
        let alertModal = Modal.getInstance(document.getElementById('modalResetPassword'));    
        alertModal.hide();
    }

    const save = async ({ formData }) => {
        try {
            let res = {}
            if(!!id){
                res = await axios.post(`${API_URL}user/reset-password/without-confirmation`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                alert('Berhasil!')
                history.push('/sub-dealer')
                hideModalResetPassword()
            }
        } catch (error) {
            setErrors(error?.response?.data?.errors)
        } finally {
            setIsLoading(false)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.target)
        formData.append(`user_id`, id)
        if(!id) {
            alert('Id Not Found')
            return
        }
        save({ formData })
    }
    return (
        <div className="modal fade" id="modalResetPassword" tabindex="-1" aria-labelledby="modalResetPassword" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${
                                                !!errors?.password
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="password"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {errors?.password?.[0]}
                                        </div>
                                    </div> 
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${
                                                !!errors?.password_confirmation
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="password_confirmation"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {errors?.password_confirmation?.[0]}
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mt-3">
                                    <button id="closeModalResetPassword" type="button" class="btn btn-outline-dark mx-3"  data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                    <button 
                                        type="submit" 
                                        class="btn btn-outline-primary mx-3"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Fragment>
                                                <span
                                                    class="spinner-border spinner-border-sm me-1  "
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Loading...
                                            </Fragment>
                                        ) : 'Save'
                                        }
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

export default ModalResetPassword