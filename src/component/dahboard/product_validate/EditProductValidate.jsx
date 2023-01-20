import React, { useState } from "react";
import FormProductValidate from "./FormProductValidate";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import { format } from "date-fns";
import { useEffect } from "react";
import moment from "moment";

const EditProductValidate = (props) => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        // invoice: 'https://testimages.aquajapanid.com:8180/invoice/INVgoyydqkdxpLE32AQT6600G.png',
        // warranty: 'https://testimages.aquajapanid.com:8180/invoice/INVgoyydqkdxpLE32AQT6600G.png',
        // barcode: 'ADSDASDASDASD',
        // category: 'Aqua',
        // date: format(new Date(), 'yyyy-MM-dd'),
        // brand: 'Aqua',
        // product_model: 'AQA-KR9ANC',
        // store: 'MITRA UTAMA',
        // store_location: 'JL. Dummy',
        // id: id,
    });
    const getDataById = async () => {
        const token = localStorage.getItem('access_token');
        const res = await axios .get(props.base_url + 'register-product/product', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                id,
            }
        })
        setData({
            ...data,
            ...res.data
        })
        setIsLoading(false)
        console.log(res.data);
    }
    useEffect(() => {
        getDataById();
    }, [id])
    
    return (
        <div>
            <div className="d-flex justify-content-center">
               <div className="col-lg-10">
                    {isLoading ? 
                    'Loading...'
                    :
                    <FormProductValidate 
                        title= "Edit Product Validate"
                        data={data} 
                    />
                    }
               </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      base_url: state.BASE_URL,
      url: state.URL,
    };
  };

  export default connect(mapStateToProps, null)(EditProductValidate);