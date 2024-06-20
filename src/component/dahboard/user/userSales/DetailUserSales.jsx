import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useToken from '../../../../hooks/useToken';
import './DetailUserSales.css';

const CardDetail = ({ data }) => {
    return (
        <div className="container">
            <div className="row gap-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Detail Informasi User Sales</h5>
                            <table className='table-sales'>
                                <tr>
                                    <td>Nama</td>
                                    <td>{data?.first_name + data?.last_name}</td>
                                </tr>
                                <tr>
                                    <td>No Telpon</td>
                                    <td>{data?.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email Sales</td>
                                    <td>{data?.phone}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{data?.status === 'active' ? 'Active' : 'Not Active'}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Informasi User Sub Dealer yang Didaftarkan</h5>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope='row'>1</td>
                                        <td>Elektrik Center</td>
                                        <td>elektrik.center@@gmail.com</td>
                                        <td>02125896321</td>
                                        <td>Jl. Elektrik center No 2 RT 02 / RW 11</td>
                                        <td>
                                            <Link to={`/sub-dealer/detail/7`}> 
                                                <button className="btn d-flex btn-edit me-3 btn-sm">
                                                    <span class="material-icons-outlined md-18">info</span>
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>2</td>
                                        <td>Jaya Abadi</td>
                                        <td>jaya.abadi@gmail.com</td>
                                        <td>02125896321</td>
                                        <td>Jl. Jaya Abadi No 2 RT 02 / RW 11</td>
                                        <td>
                                            <Link to={`/sub-dealer/detail/7`}> 
                                                <button className="btn d-flex btn-edit me-3 btn-sm">
                                                    <span class="material-icons-outlined md-18">info</span>
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>3</td>
                                        <td>Sinar Mulya</td>
                                        <td>sinar.mulya@gmail.com</td>
                                        <td>02125896321</td>
                                        <td>Jl. Sinar Mulya No 2 RT 02 / RW 11</td>
                                        <td>
                                            <Link to={`/sub-dealer/detail/7`}> 
                                                <button className="btn d-flex btn-edit me-3 btn-sm">
                                                    <span class="material-icons-outlined md-18">info</span>
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const DetailUserSales = () => {
    const { id } = useParams();
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const token = useToken()

    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${API_URL}user/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                setData(res.data.data);
                
            } finally {
                setLoading(false)
            }
        }
        if(!!token){
            fetchData();
        }
    }, [id, token]);

    if(loading){
        return <div>Loading...</div>
    }
    if(!loading && !data){
        return <div>User Sales Not Found!</div>
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="col-lg-10">
                    <CardDetail 
                        data={data} 
                    />
                </div>
            </div>
        </div>
    )
}
export default DetailUserSales;
