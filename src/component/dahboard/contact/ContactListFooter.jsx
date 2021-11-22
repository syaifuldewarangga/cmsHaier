import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ContactListFooter = (props) => {
    const [contactData, setContactData] = useState({})
    const token = localStorage.getItem('access_token')

    const getContactFromAPI = async () => {
        await axios.get(props.base_url + 'contact', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            setContactData(res.data)
        })
    }

    useEffect(() => {
        getContactFromAPI()
    }, [])

    return (
        <div className="contact-list">
            <h5 className="dasboard title">Contact Footer</h5>
            <div className="mt-5">
                <div>
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-lg-end mb-3">
                            <Link to="/setting/contact-footer/edit">
                                <button className="btn d-flex justify-content-center btn-edit">
                                    <span class="material-icons-outlined me-3"> edit </span>
                                    <span className="fw-bold">Edit Contact Footer</span>
                                </button>
                            </Link>
                        </div>
                        <div>
                            <div className="card">
                                <div class="card-body">
                                    <table>
                                        <tr>
                                            <th>address</th>
                                            <td className="px-3">:</td>
                                            <td>{contactData.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td className="px-3">:</td>
                                            <td>{contactData.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>Fax</th>
                                            <td className="px-3">:</td>
                                            <td>{contactData.fax}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-5" dangerouslySetInnerHTML={{ __html: contactData }}></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
} 
export default  connect(mapStateToProps, null) (ContactListFooter)