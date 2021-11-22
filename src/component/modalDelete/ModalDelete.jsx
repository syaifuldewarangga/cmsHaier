import React, { useEffect, useState } from "react";

const ModalDelete = (props) => {
    const [dataID, setDataID] = useState()

    useEffect(() => {
        setDataID(props.dataID)
    }, [props.dataID])

    return (
        <div className="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="modalDeleteLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center">
                            {props.message}
                            <div className="mt-3">
                                <button id="closeModalDelete" type="button" class="btn btn-outline-dark mx-3"  data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                <button 
                                    type="button" 
                                    class="btn btn-outline-danger mx-3"
                                    onClick={() => props.remove(dataID)}
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

export default ModalDelete