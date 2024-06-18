import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";

const ModalResetPassword = ({ id }) => {
    const [errors, setErrors] = useState({})
    const hideModalResetPassword = () => {
        let alertModal = Modal.getInstance(document.getElementById('modalResetPassword'));    
        alertModal.hide();
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        console.log(Object.fromEntries(formData))
        hideModalResetPassword()
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
                                            {!!errors?.password}
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
                                                !!errors?.confirm_password
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="confirm_password"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.password}
                                        </div>
                                    </div> 
                                </div>
                                <div className="col-12"></div>
                            </div>

                            <div className="text-center">
                                <div className="mt-3">
                                    <button id="closeModalResetPassword" type="button" class="btn btn-outline-dark mx-3"  data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                    <button 
                                        type="submit" 
                                        class="btn btn-outline-primary mx-3"
                                    >
                                        Yes
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