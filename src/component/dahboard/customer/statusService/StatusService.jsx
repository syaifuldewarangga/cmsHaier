import React, { Component } from "react";
import StatusServiceData from "./statusServiceData/StatusServiceData";

class StatusService extends Component {
    render() {
        return(
            <div className="user-role">
                <h5 className="dashboard title" >Status Service</h5>
                <div className="mt-5">
                    <div>
                        <div className="row">
                            <div className="d-flex col-lg-6 col-12 mb-3">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card">
                            <div className="table-responsive">
                                <table className="dashboard table">
                                    <thead>
                                        <tr>
                                            <th>Photos</th>
                                            <th>ID Service</th>
                                            <th>Date of Purchase</th>
                                            <th>Barcode</th>
                                            <th>Product ID</th>
                                            <th>Brand</th>
                                            <th>Product</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <StatusServiceData />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusService;
