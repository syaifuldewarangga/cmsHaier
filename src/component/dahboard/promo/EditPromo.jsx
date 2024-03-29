import React from "react";
import FormPromo from "./FormPromo";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';

const EditPromo = (props) => {
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
                    <FormPromo 
                        title= "Edit Promo"
                        data={data} 
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

  export default connect(mapStateToProps, null)(EditPromo);