import axios from 'axios';
import React from "react";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import FormIncentiveProduct from "./FormIncentiveProduct";
const dummy = {
    productModelList: [
        {
            product_model : 'AQA-KR9ANC',
            incentive: 5000,
        },
        {
            product_model : 'AQA-KR9ANR',
            incentive: 10000,
        },
    ]
}
const EditIncentiveProduct = (props) => {
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
                    <FormIncentiveProduct 
                        title= "Edit Incentive Product"
                        data={dummy} 
                    />
                :
                null
                }
               </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      base_url: state.BASE_URL,
    };
  };

  export default connect(mapStateToProps, null)(EditIncentiveProduct);