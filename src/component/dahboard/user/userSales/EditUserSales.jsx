import axios from 'axios';
import React from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useToken from '../../../../hooks/useToken';
import FormUserSales from "./FormUserSales";

const EditUserSales = (props) => {
    const { id } = useParams();
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true)
    const { token } = useToken()

    const { API_URL } = useSelector((state) => state.SUB_DEALER);

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
                    <FormUserSales 
                        title= "Edit User Sales"
                        data={data} 
                    />
               </div>
            </div>
        </div>
    );
};


export default EditUserSales;