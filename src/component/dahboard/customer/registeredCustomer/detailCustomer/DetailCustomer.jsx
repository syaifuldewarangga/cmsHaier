import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const DetailCustomer = (props) => {
    const [data, setData] = useState({});

    var token = localStorage.getItem('access_token')
    const { username } = useParams()

    const getDetailUserFromAPI = async () => {
        await axios.get(props.base_url + "user", {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                username: username
            }
        }).then((res) => {
            setData(res.data)
        })
    }

    useEffect(() => {
        getDetailUserFromAPI();
    }, [])
    return (
        <div>
            <div className="card">
                <div className="card-header btn-import">
                    <h5
                        className="dashboard title"
                        style={{ margin: '0', padding: '7px 0' }}
                    >
                        Detail User
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {
                            data.image !== undefined  && data.image.length !== 0 ? 
                            <div className="col-lg-12 d-flex justify-content-center mb-3">
                                <img src={props.image_url + data.image[0].path} alt="file" className="img-fluid" />
                            </div> : null
                        }

                        <div className="col-lg-6 mb-3">
                            <label className="form-label">First Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.first_name}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Last Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.last_name}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">KTP/SIM</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.nik}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Gender</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.gender}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input 
                                type="date" 
                                className="form-control"
                                value={data.birth_date}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Age</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.age}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.email}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Mobile Phone Number</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.phone}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Phone Number</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.phone_office}
                                disabled
                            />
                        </div>

                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Fax</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.fax}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Province</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.province}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">City</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.city}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">District</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.district}
                                disabled
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="form-label">Postal Code</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={data.postal_code}
                                disabled
                            />
                        </div>
                        <div className="col-lg-12 mb-3">
                            <label className="form-label">Address</label>
                            <textarea 
                                type="text" 
                                className="form-control"
                                rows="6"
                                value={data.address}
                                disabled
                            ></textarea>
                        </div>
                        <Link to="/customer/registered-customer">
                            <div className="d-grid gap-2">
                                    <button class="btn btn-import" type="button">
                                        Back
                                    </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url : state.BASE_URL,
        image_url : state.URL,
    }
}
export default connect(mapStateToProps, null) (DetailCustomer);