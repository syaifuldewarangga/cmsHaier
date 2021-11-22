import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ContactInformationList = (props) => {
    const [contactData, setContactData] = useState()

    const token = localStorage.getItem('access_token')

    const getContactInformationDataFromAPI = async () => {
        await axios.get(props.base_url + 'contact-information', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then((res) => {
            setContactData(res.data.content)
        })
    }

    useEffect(() => {
        getContactInformationDataFromAPI()
    }, [])

    return (
        <div className="about-list">
            <h5 className="dasboard title">Contact Information</h5>
            <div className="mt-5">
                <div>
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-lg-end mb-3">
                            <Link to="/setting/contact-information/edit">
                                <button className="btn d-flex justify-content-center btn-edit">
                                    <span class="material-icons-outlined me-3"> edit </span>
                                    <span className="fw-bold">Edit Contact Information</span>
                                </button>
                            </Link>
                        </div>
                        <div className="mt-5" dangerouslySetInnerHTML={{ __html: contactData }}></div>
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

export default connect(mapStateToProps, null) (ContactInformationList)