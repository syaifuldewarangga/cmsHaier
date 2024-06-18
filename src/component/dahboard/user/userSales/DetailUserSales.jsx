import axios from 'axios';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './DetailUserSales.css'

const CardDetail = ({ data }) => {
    const [form, setForm] = useState({
        start_date: '',
        end_date: ''
    })
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
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
                                    <td>Joyo Suroyo</td>
                                </tr>
                                <tr>
                                    <td>No Telpon</td>
                                    <td>02178586969</td>
                                </tr>
                                <tr>
                                    <td>Email Sales</td>
                                    <td>02178586969</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>Pria</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>Active</td>
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
const DetailUserSales = (props) => {
    const { id } = useParams();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        var token = localStorage.getItem('access_token');
        async function fetchData() {
            setLoading(true)
            await axios.get(props.base_url + 'extended-warranty-promo/get', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                params: {
                    id,
                },
            })
            .then((res) => {
                // console.log(res.data)
                setData(res.data);
            })
            .catch((e) => {
                if (e.response) {
                    // console.log(e.response);
                } else if (e.request) {
                    // console.log('request : ' + e.request);
                } else {
                    // console.log('message : ' + e.message);
                }
            });
            setLoading(false)
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <div className="d-flex justify-content-center">
               <div className="col-lg-10">
                {!loading ? 
                    <CardDetail 
                        data={data} 
                    />
                :
                    'Loading...'
                }
               </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      base_url: state.BASE_URL,
      user_permission: state.USER_PERMISSION
    };
  };
export default connect(mapStateToProps, null)(DetailUserSales);
