import React from "react";

const ModalDeleteAllData = (props) => {
    return (
        <div className="modal fade" id="modalDeleteAll" tabindex="-1" aria-labelledby="modalDeleteAllLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center">
                            Are you sure want to delete all data ? 
                            <div className="mt-3">
                                <button id="closeModalDeleteAll" type="button" class="btn btn-outline-dark mx-3"  data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                <button 
                                    type="button" 
                                    class="btn btn-outline-danger mx-3"
                                    onClick={props.remove}
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

export default ModalDeleteAllData