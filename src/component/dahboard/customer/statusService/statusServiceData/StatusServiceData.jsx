import React, { Component } from "react"; 

class StatusServiceData extends Component {
    render () {
        return (
            <tbody>
                <tr>
                    <td className="align-middle">
                        <img src="/assets/images/product/product1.png" style={{ width: "100px" }} />
                    </td>
                    <td className="align-middle">1123399766</td>
                    <td className="align-middle">12/08/2021</td>
                    <td className="align-middle">2349885577</td>
                    <td className="align-middle">KLK0987</td>
                    <td className="align-middle">AQUA JAPAN</td>
                    <td className="align-middle">Kulkas 1 Pintu</td>
                    <td className="align-middle">
                        <button className="btn btn-sm btn-success rounded-pill px-3">Repair Finished</button>
                    </td>
                </tr>
            </tbody>
        );
    }
}

export default StatusServiceData;