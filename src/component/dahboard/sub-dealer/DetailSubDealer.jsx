import axios from 'axios';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import './DetailSubDealer.css'

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
                            <h5 className="card-title">Detail Informasi Sub Dealer</h5>
                            <table className='table-user-toko'>
                                <tr>
                                    <td>Nama Toko</td>
                                    <td>Jaya Elektronik Center</td>
                                </tr>
                                <tr>
                                    <td>Nama PIC Toko</td>
                                    <td>Jaya Suraya</td>
                                </tr>
                                <tr>
                                    <td>No Telpon</td>
                                    <td>02178586969</td>
                                </tr>
                                <tr>
                                    <td>Email Toko</td>
                                    <td>02178586969</td>
                                </tr>
                                <tr>
                                    <td>Alamat Toko</td>
                                    <td>Jalan testing, NO 14 RT 02 / RW 04 Kab Bogor</td>
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
export default connect(mapStateToProps, null)(DetailSubDealer);
