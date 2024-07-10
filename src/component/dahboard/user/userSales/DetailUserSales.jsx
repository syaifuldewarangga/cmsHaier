import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useToken from '../../../../hooks/useToken';
import './DetailUserSales.css';
import SubDealerList from '../../sub-dealer/SubDealerList';

const CardDetail = ({ data }) => {
    return (
        <div className="container">
            <div className="row gap-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">User Sales Information</h5>
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
                                    <td>{data?.email}</td>
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
                            <SubDealerList created_by={data?.id} />
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
