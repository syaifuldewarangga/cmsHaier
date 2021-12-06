import React from 'react'
import './StatusServiceDetail.css'

function StatusServiceDetail() {
    return (
        <div className="status-service-detail">
            <h5 className="dashboard title" >Status Service</h5>
            <div className="mt-5">
                <div className="d-lg-flex justify-content-center">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-center">
                                <h4 className="title">Browse Repair Service</h4>
                                </div>
                                <div className="row mt-5">
                                <div className="col-lg-6">
                                    <div className="card header-title-status">
                                        <p className="text-uppercase">
                                            Repair Status Service
                                        </p>
                                    </div>
                                    <div className="content mt-4">
                                        <div>
                                            <h6>Request Date : </h6>
                                            <p>asdf</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card header-title-status">
                                    <p className="text-uppercase">Product Information</p>
                                    </div>
                                    <div className="content mt-4">
                                    <div>
                                        <h6>Product </h6>
                                        <p>asdf</p>
                                    </div>
                                    <div className="mt-4">
                                        <h6>Model </h6>
                                        <p>asdf</p>
                                    </div>
                                    <div className="mt-4">
                                        <h6>Serial Number </h6>
                                        <p>asdf</p>
                                    </div>
                                    <div className="mt-4">
                                        <h6>Date of Purchase </h6>
                                        <p>asdf</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                    <div className="card-body header-title-status">
                                        <div>
                                        <h5 style={{ color: '#8D8D8D' }}>
                                            Status Information
                                        </h5>
                                        </div>
                                        <div style={{ overflowX: 'auto' }}>
                                        <table className="table table-white mt-3">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Number</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-nowrap">
                                                    asdf
                                                    </td>
                                                    <td className="text-nowrap">
                                                    asdf
                                                    </td>
                                                    <td className="text-nowrap">
                                                        asdf
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusServiceDetail
