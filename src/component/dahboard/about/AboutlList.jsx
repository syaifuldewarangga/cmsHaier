import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AboutList = (props) => {
    const [aboutData, setAboutData] = useState('')

    const getAboutFromAPI = async () => {
        let token = localStorage.getItem('access_token')
        await axios.get(props.base_url + 'about', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then((res) => {
            setAboutData(res.data.content)
        })
    }

    useEffect(() => {
        getAboutFromAPI()
    }, [])
    return (
        <div className="about-list">
            <h5 className="dasboard title">About</h5>
            <div className="mt-5">
                <div>
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-lg-end mb-3">
                            <Link to="/setting/about/edit">
                                <button className="btn d-flex justify-content-center btn-edit">
                                    <span class="material-icons-outlined me-3"> edit </span>
                                    <span className="fw-bold">Edit About page</span>
                                </button>
                            </Link>
                        </div>
                        <div className="mt-5" dangerouslySetInnerHTML={{ __html: aboutData }}></div>
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
export default  connect(mapStateToProps, null) (AboutList)