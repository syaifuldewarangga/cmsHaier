import axios from 'axios';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import './DetailIncentiveReference.css';
import { getMonthNameByValue } from './FormIncentiveReference';

const CardDetail = ({ data }) => {
    const renderData = useMemo(() => {
        if(data?.record?.length === 0 || !data?.record) {
            return (
                <tbody>
                    <tr>
                        <td colSpan={3}>
                            <div className="d-flex justify-content-center">
                                <p>Data Empty</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
        }

        return data?.record?.map((v, i) => {
            return (
                <tbody>
                    <tr>
                        <th scope="col">{i + 1}</th>
                        <th scope="col">{v?.product_model}</th>
                        <th scope="col">{v?.incentive}</th>
                    </tr>
                </tbody>
            )
        })

    }, [data])
    return (
        <div className="container">
            <div className="row gap-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Incentive Reference Information</h5>
                            <table className='table-sales'>
                                <tr>
                                    <td>Year</td>
                                    <td>{data?.year}</td>
                                </tr>
                                <tr>
                                    <td>Month</td>
                                    <td>{getMonthNameByValue(data?.month)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h5 className="card-title mb-3">List Product Model</h5>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex justify-content-end">
                                        <Link to={`/incentive-reference/detail/${data?.id}/upsert`}>
                                            <button className='btn btn-outline-primary'>{data?.record?.length === 0 || !data?.record ? 'Add Product Model' : 'Edit Product Model'}</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product Model</th>
                                        <th scope="col">Incentive</th>
                                    </tr>
                                </thead>
                                {renderData}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const DetailIncentiveReference = () => {
    const { id } = useParams();
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const { token } = useToken()

    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${API_URL}monthly-incentives/${id}`, {
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
        return <div>Incentive Not Found!</div>
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
export default DetailIncentiveReference;