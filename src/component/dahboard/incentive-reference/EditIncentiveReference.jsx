import axios from 'axios';
import React from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import FormIncentiveReference from './FormIncentiveReference';

const EditIncentiveReference = (props) => {
    const { id } = useParams();
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true)

    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const token = useToken()

    React.useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${API_URL}incentive/${id}`, {
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
                   <FormIncentiveReference 
                       title= "Edit Incentive Reference"
                    // data={data}
                       data={{
                          year: '2024',
                          month: 2
                       }} 
                   />
               </div>
            </div>
        </div>
    );
};



export default EditIncentiveReference;