import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Pagination from "../../../pagination/Pagination";
import StatusServiceData from "./statusServiceData/StatusServiceData";

const StatusService = (props) => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const history = useHistory()

    var token = localStorage.getItem('access_token');
    const getServiceStatusAPI = async () => {
        await axios.get(props.base_url + "register-service", {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                page: currentPage,
                itemPerPage: 10
            }
        }).then((res) => {
            setData(res.data.content)
            setCurrentPage(res.data.number)
            setTotalPage(res.data.totalPages)
        })
    }

    useEffect(() => {
        getServiceStatusAPI()
    }, [currentPage])

    const handleChangePage = (value) => {
        let newPage = value - 1
        setCurrentPage(newPage)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push('/customer/status-service/detail/1/1')
    }
    return(
        <div className="user-role">
            <h5 className="dashboard title" >Status Service</h5>
            <div className="mt-5">
                <div>
                    <div className="row">
                        <form onSubmit={handleSubmit}> 
                            <div className="d-flex col-lg-6 col-12 mb-3">
                                    <input class="form-control me-2" placeholder="SR Number" name="SRNumber" />
                                    <input class="form-control me-2" placeholder="Phone Number" name="phone_number" />
                                    <button className="btn btn-outline-success" type="submit"> Search </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    <div className="card">
                        <div className="table-responsive">
                            <table className="dashboard table">
                                <thead>
                                    <tr>
                                        {/* <th>Photos</th> */}
                                        <th>SR Number</th>
                                        <th>Phone</th>
                                        <th>Date of Purchase</th>
                                        <th>Barcode</th>
                                        <th>Brand</th>
                                        <th>Product</th>
                                    </tr>
                                </thead>

                                { 
                                    data.map((item, index) => (
                                        <StatusServiceData 
                                            key={index}
                                            data={item}
                                        />
                                    ))
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <Pagination 
                        currentPage={currentPage + 1}
                        totalPage={totalPage}
                        changePage = {handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
}
export default  connect(mapStateToProps, null) (StatusService);
