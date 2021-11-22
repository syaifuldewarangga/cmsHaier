import axios from "axios";
import { decode } from "base-64";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import RegisteredProductData from "./registeredProductData/RegisteredProductData";

const RegisteredProductListByUser = (props) => {
    const { userID } = useParams()
    const decodeUserID = decode(userID)
    const [data, setData] = useState([])

    var token = localStorage.getItem('access_token');

    const getProductByUser = async () => {
        await axios.get(props.base_url + "register-product/user", {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                id: decodeUserID
            }
        }).then((res) => {
            // console.log(res.data.content)
            setData(res.data.content)
        })
    }
    useEffect(() => {
        getProductByUser()
    }, [])
    return (
        <div>
            <div className="user-role">
                <h5 className="dashboard title">Registered Product</h5>
                <div className="mt-5">
                    {/* <div>
                        <div className="row">
                            <div className="d-flex col-lg-6 col-12 mb-3">
                            <input
                                class="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            </div>
                        </div>
                    </div> */}

                    <div>
                        <div className="card">
                            <div className="table-responsive">
                            <table className="dashboard table">
                                <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Photos</th>
                                    <th>Barcode</th>
                                    <th>Product ID</th>
                                    <th>Product</th>
                                    <th>Product Model</th>
                                    <th>Serial Number</th>
                                    <th>Date of Purchase</th>
                                    <th>Store Location</th>
                                    <th>Store Name</th>
                                    <th>Email</th>
                                    <th>Registered Date</th>
                                </tr>
                                </thead>
                                {
                                    data.map((item, index) => (
                                        <RegisteredProductData  
                                            key={index}
                                            data={item}
                                        />
                                    ))
                                }
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url : state.BASE_URL
    }
}
export default connect(mapStateToProps, null) (RegisteredProductListByUser)