import React, { useEffect, useState } from "react";

const ModalConfirm = (props) => {
    return (
        <div className="modal fade" id="modalConfirm" tabindex="-1" aria-labelledby="modalDeleteLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center">
                            {props.message}
                            <div className="mt-3">
                                <button id="closeModalConfirm" type="button" class="btn btn-outline-dark mx-3"  data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                <button 
                                    type="button" 
                                    class="btn btn-outline-danger mx-3"
                                    onClick={() => props.fetchAPI()}
                                >
                                    Yes
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