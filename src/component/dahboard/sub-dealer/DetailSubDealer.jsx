import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import './DetailSubDealer.css';

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
                            <h5 className="card-title">PIC Information</h5>
                            <table className='table-pic'>
                                <tr>
                                    <td>Name</td>
                                    <td>{data?.first_name + data?.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{data?.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{data?.email}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{data?.dealer_detail?.gender === 'man' ? 'Pria' : 'Wanita'}</td>
                                </tr>
                                <tr>
                                    <td>Bank Name</td>
                                    <td>{data?.dealer_detail?.bank_name}</td>
                                </tr>
                                <tr>
                                    <td>Bank Account Name</td>
                                    <td>{data?.dealer_detail?.bank_account_name}</td>
                                </tr>
                                <tr>
                                    <td>Bank Account Number</td>
                                    <td>{data?.dealer_detail?.bank_account_number}</td>
                                </tr>
                            </table>
                            <h5 className="card-title mt-5">Store Information</h5>
                            <table className='table-user-toko'>
                                <tr>
                                    <td>Name</td>
                                    <td>{data?.dealer_detail?.store_name}</td>
                                </tr>
                                <tr>
                                    <td>Code</td>
                                    <td>{data?.dealer_detail?.store_code}</td>
                                </tr>
                                <tr>
                                    <td>Province</td>
                                    <td>{data?.dealer_detail?.province}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{data?.dealer_detail?.city}</td>
                                </tr>
                                <tr>
                                    <td>District</td>
                                    <td>{data?.dealer_detail?.district || '-'}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{data?.dealer_detail?.address}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Detail Informasi Sales</h5>
                            <table className='table-sales'>
                                <tr>
                                    <td>Nama Sales</td>
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
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Informasi Sellout</h5>
                            <div className="row align-items-end mb-4 mt-4">
                                <div className="col-lg-5">
                                    <input
                                        type="date"
                                        className={`form-control`}
                                        aria-label="start_date"
                                        onChange={onChange}
                                        value={form.start_date}
                                        required
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <label className="form-label text-center">To</label>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        type="date"
                                        className={`form-control`}
                                        aria-label="end_date"
                                        onChange={onChange}
                                        value={form.end_date}
                                        required
                                    />
                                </div>
                                <div className="col-lg-2">
                                    <button className='btn btn-primary'>Filter</button>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-4">
                                    <div className="card bg-card">
                                        <div className="d-flex align-items-center">
                                            <div className="count-icon" style={{ background: '#6CCAC9' }}>
                                                <span class="icon material-icons-outlined"> store </span>
                                            </div>
                                            <div className="count text-center">
                                            <p className="total">19</p>
                                                <p className="description">Total Sales</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Unit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope='row'>1</td>
                                        <td>TV</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>2</td>
                                        <td>WM</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>3</td>
                                        <td>Refrigrator</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>4</td>
                                        <td>AC</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>5</td>
                                        <td>CC</td>
                                        <td>6</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Informasi Incentive</h5>
                            <div className="row align-items-end mb-4 mt-4">
                                <div className="col-lg-5">
                                    <input
                                        type="date"
                                        className={`form-control`}
                                        aria-label="start_date"
                                        onChange={onChange}
                                        value={form.start_date}
                                        required
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <label className="form-label text-center">To</label>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        type="date"
                                        className={`form-control`}
                                        aria-label="end_date"
                                        onChange={onChange}
                                        value={form.end_date}
                                        required
                                    />
                                </div>
                                <div className="col-lg-2">
                                    <button className='btn btn-primary'>Filter</button>
                                </div>
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Incentive</th>
                                        <th scope="col">Unit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope='row'>1</td>
                                        <td>TV</td>
                                        <td>5.000</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>2</td>
                                        <td>WM</td>
                                        <td>10.000</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>3</td>
                                        <td>Refrigrator</td>
                                        <td>15.000</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>4</td>
                                        <td>AC</td>
                                        <td>25.000</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td scope='row'>5</td>
                                        <td>CC</td>
                                        <td>35.000</td>
                                        <td>6</td>
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
const DetailSubDealer = (props) => {
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
        return <div>User Sub Dealer Not Found!</div>
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

export default DetailSubDealer;
