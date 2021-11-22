import React, { Component } from "react";

class StoreListData extends Component {
    render() {
        return(
            <tbody>
                <tr>
                    <td>
                        <div className="d-flex justify-content-start">
                            <button className="btn d-flex btn-edit me-3 btn-sm">
                                <span class="material-icons-outlined md-18"> edit </span> 
                            </button>
                            <button className="btn d-flex btn-show btn-sm"> 
                                <span class="material-icons-outlined md-18"> visibility </span>
                            </button>
                        </div>
                    </td>
                    <td>Arjuna Elektronik</td>
                    <td>0865XXXXXXXX</td>
                    <td>Banten</td>
                    <td>Tanggerang Selatan</td>
                    <td>Ciputat Timur</td>
                    <td>12679</td>
                    <td>Jl.Falmboyan No.32</td>
                    <td>Senin - Jumat</td>
                    <td>08:00 - 17:00</td>
                </tr>
            </tbody>
        );
    }
}

export default StoreListData;