import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import './DetailSubDealer.css';

const now = moment();

const start_date = now.startOf('month').format('YYYY-MM-DD');

const end_date = now.endOf('month').format('YYYY-MM-DD');

const SellOutCard = ({ data }) => {
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const { token } = useToken()

    const [sellout, setSellout] = useState()
    const [loadingSellOut, setLoadingSellOut] = useState(true)

    const [form, setForm] = useState({
        start_date,
        end_date
    })
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value})

    useEffect(() => {
        let mounted = true
        
        const fetchDataSellout = async () => {
            if(!loadingSellOut){
                setLoadingSellOut(true)
            }
            try {
                const res = await axios.get(`${API_URL}sell-out`, {
                    params: {
                        start_date: moment(form.start_date).format('YYYY/MM/DD'),
                        end_date: moment(form.end_date).format('YYYY/MM/DD')
                    },
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                if(mounted){
                    setSellout(res.data);
                }
            } finally {
                setLoadingSellOut(false)
            }
        }

        if(!!token){
            fetchDataSellout();
        }
    }, [data, token, form]);

    const renderData = useMemo(() => {
        if(!sellout) return null
        if(sellout.length === 0) {
            return (
                <tr> 
                    <td colSpan={3}>kosong</td>
                </tr>
            )
        }
        return sellout.map((v, i) => {
            return (
                <tr key={v?.id}>
                    <td scope='row'>{i + 1}</td>
                    <td>{v.category}</td>
                    <td>{v.total_product}</td>
                </tr>
            )
        })
    }, [sellout])

    const totalSalesSellout = useMemo(() => {
        if(!sellout) return 0
        return sellout.reduce((prev, curr) => prev + curr.total_product, 0)
    }, [sellout])

    return (
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Informasi Sellout</h5>
                    <div className="row align-items-end mb-4 mt-4">
                        <div className="col-lg-5">
                            <input
                                type="date"
                                className={`form-control`}
                                name="start_date"
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
                                name="end_date"
                                onChange={onChange}
                                value={form.end_date}
                                required
                            />
                        </div>
                        <div className="col-lg-2">
                            <button className='btn btn-primary'>Filter</button>
                        </div>
                    </div>
                    {!loadingSellOut ?
                    <>
                        <div className="row mb-4">
                            <div className="col-4 col-sm-12">
                                <div className="card bg-card">
                                    <div className="d-flex align-items-center">
                                        <div className="count-icon" style={{ background: '#6CCAC9' }}>
                                            <span class="icon material-icons-outlined"> store </span>
                                        </div>
                                        <div className="count text-center">
                                        <p className="total">{totalSalesSellout}</p>
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
                                    <th scope="col">Category Product</th>
                                    <th scope="col">Total Product</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderData}
                            </tbody>
                        </table>
                    </>
                    : 
                    <div className='col-12'>
                        <div className="card">
                            <div className="card-body" style={{ height: 350 }}>
                                <div className="d-flex h-100 justify-content-center align-items-center">
                                    <span
                                        class="spinner-border spinner-border-md me-1"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

const IncentiveCard = ({ data }) => {
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const { token } = useToken()

    const [incentive, setIncentive] = useState()
    const [loadingIncentive, setLoadingIncentive] = useState(true)

    const [form, setForm] = useState({
        start_date,
        end_date
    })
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    useEffect(() => {
        let mounted = true
        
        const fetchDataIncentive = async () => {
            if(!loadingIncentive){
                setLoadingIncentive(true)
            }
            try {
                const res = await axios.get(`${API_URL}incentive-report`, {
                    params: {
                        start_date: moment(form.start_date).format('YYYY/MM/DD'),
                        end_date: moment(form.end_date).format('YYYY/MM/DD')
                    },
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                if(mounted){
                    setIncentive(res.data.data);
                }
            } finally {
                setLoadingIncentive(false)
            }
        }

        if(!!token){
            fetchDataIncentive();
        }
    }, [data, token, form]);

    const renderData = useMemo(() => {
        if(!incentive) return null
        if(incentive.length === 0) {
            return (
                <tr> 
                    <td align='center' colSpan={4}>Empty</td>
                </tr>
            )
        }
        return incentive.map((v, i) => {
            return (
                <tr key={v?.id}>
                    <td scope='row'>{i + 1}</td>
                    <td>{v.category}</td>
                    <td>{v.model}</td>
                    <td>{v.total_product}</td>
                </tr>
            )
        })
    }, [incentive])

    return (
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Informasi Incentive</h5>
                    <div className="row align-items-end mb-4 mt-4">
                        <div className="col-lg-5">
                            <input
                                type="date"
                                className={`form-control`}
                                name="start_date"
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
                                name="end_date"
                                onChange={onChange}
                                value={form.end_date}
                                required
                            />
                        </div>
                        <div className="col-lg-2">
                            <button className='btn btn-primary'>Filter</button>
                        </div>
                    </div>
                    {!loadingIncentive ?
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Category</th>
                                <th scope="col">Product Model</th>
                                <th scope="col">Total Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderData} 
                        </tbody>
                    </table>
                    : 
                    <div className='col-12'>
                        <div className="card">
                            <div className="card-body" style={{ height: 100 }}>
                                <div className="d-flex h-100 justify-content-center align-items-center">
                                    <span
                                        class="spinner-border spinner-border-md me-1"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div> 
    )
}

const CardDetail = ({ data }) => {
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
                            <h5 className="card-title">User Sales Information</h5>
                            <table className='table-sales'>
                                <tr>
                                    <td>Nama</td>
                                    <td>{data?.created_by?.first_name + data?.created_by?.last_name}</td>
                                </tr>
                                <tr>
                                    <td>No Telpon</td>
                                    <td>{data?.created_by?.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email Sales</td>
                                    <td>{data?.created_by?.email}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{data?.created_by?.status === 'active' ? 'Active' : 'Not Active'}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <SellOutCard data={data} />
                <IncentiveCard data={data} />
                
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}
const DetailSubDealer = (props) => {
    const { id } = useParams();
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const { token } = useToken()

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
