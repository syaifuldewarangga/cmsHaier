import React from "react";
import './AlertModal.css'

const AlertModal = (props) => {
    return (
        <div className="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div>
                            {
                                props.data.status === 'success' ? 
                                <div className="swal2-icon swal2-success swal2-animate-success-icon" style={{ display: "flex" }}>
                                    <div className="swal2-success-circular-line-left" style={{ backgroundColor: "rgb(255, 255, 255)" }}></div>
                                    <span className="swal2-success-line-tip"></span>
                                    <span className="swal2-success-line-long"></span>
                                    <div className="swal2-success-ring"></div> 
                                    <div className="swal2-success-fix" style={{ backgroundColor: "rgb(255, 255, 255)" }}></div>
                                    <div className="swal2-success-circular-line-right" style={{ backgroundColor: "rgb(255, 255, 255)" }}></div>
                                </div> : 

                                <div className="swal2-icon swal2-error swal2-animate-error-icon" style={{ display: "flex" }}>
                                    <span className="swal2-x-mark">
                                        <span className="swal2-x-mark-line-left"></span>
                                        <span className="swal2-x-mark-line-right"></span>
                                    </span>
                                </div>
                            }


                            <div className="text-center">
                                <span className="modal-question-thanks">{props.data.title} </span>
                                <span className="modal-question-message">{props.data.subTitle}</span>

                                <div className="modal-question-button my-3">
                                    <button className="btn rounded-pill" data-bs-dismiss="modal" aria-label="Close">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertModal