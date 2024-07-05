import React, { Fragment } from "react";

const ModalConfirm = ({ message, remove, isLoading, buttonTittle = 'Delete' }) => {
    return (
        <div className="modal fade" id="modalConfirm" tabindex="-1" aria-labelledby="modalDeleteLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center">
                            {message}
                            <div className="mt-3">
                                <button id="closeModalConfirm" type="button" class="btn btn-outline-dark mx-3"  data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                <button 
                                    type="button" 
                                    class="btn btn-outline-danger mx-3"
                                    disabled={isLoading}
                                    onClick={() => remove()}
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
                                    ) : buttonTittle
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm