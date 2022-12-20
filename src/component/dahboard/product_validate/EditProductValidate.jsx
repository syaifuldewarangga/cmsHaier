import React from "react";
import FormProductValidate from "./FormProductValidate";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import { format } from "date-fns";

const EditProductValidate = (props) => {
    const { id } = useParams();
    const [data, setData] = React.useState({
        invoice: 'https://testimages.aquajapanid.com:8180/invoice/INVgoyydqkdxpLE32AQT6600G.png',
        warranty: 'https://testimages.aquajapanid.com:8180/invoice/INVgoyydqkdxpLE32AQT6600G.png',
        barcode: 'ADSDASDASDASD',
        category: 'Aqua',
        date: format(new Date(), 'yyyy-MM-dd'),
        brand: 'Aqua',
        product_model: 'AQA-KR9ANC',
        store: 'MITRA UTAMA',
        store_location: 'JL. Dummy',
        id: id,
    });
    
    return (
        <div>
            <div className="d-flex justify-content-center">
               <div className="col-lg-10">
                   <FormProductValidate 
                       title= "Edit Product Validate"
                       data={data} 
                   />
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

  export default connect(mapStateToProps, null)(EditProductValidate);