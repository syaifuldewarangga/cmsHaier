import React, { useEffect, useState } from 'react';
import ProductListData from './ProductListData/ProdcutListData';
import axios from 'axios';
import { connect } from 'react-redux';
import { client_id, client_secret, grant_type } from '../../../variable/GlobalVariable';
import { ModelCheck } from '../../../variable/ModelCheck';
import { DateFormat, TimeFormat } from '../../../variable/DateFormat';
import { numberWithDot } from '../../../variable/NumberFormat';

function ProductList(props) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [totalProductData, setTotalProductData] = useState('')
  const [isLoading, setIsLoading] = useState(false) 

  var token = localStorage.getItem('access_token');

  const productAPIGTM = async (gtmToken) => {
    await axios.post(props.gtm_url + 'pmtcommondata/GetProfileUserByCondition',
      {
        Barcode: search,
        ProductID: '',
        PhoneNumber: '',
      },
      {
        headers: {
          Authorization: gtmToken,
          'Content-Type': 'text/plain',
        },
      }
    )
    .then((res) => {
      let count = res.data.data.length
      if(count > 0) {
        setData(res.data.data);
      } else {
        fetchDataProductWMS()
      }
    })
    .catch((e) => {
      console.log(e.response)
    }).finally(() => {
      setIsLoading(false)
    });
  }

  const fetchDataProductWMS = async () => {
    await axios.get(props.oapi_url + 'wms-order-out', {
      params: {
        barcode: search
      }
    }).then((res) => {
      let dataWMS = res.data
      console.log(dataWMS)
      let count = Object.keys(dataWMS).length
      let modelData = ModelCheck(dataWMS.PRODUCT_DESC_ZH.substring(0,4))
      if(count > 0) {
        setData([{
          Barcode: dataWMS.BARCODE,
          ProductName: dataWMS.PRODUCT_DESC_ZH,
          ProductID: dataWMS.PRODUCT_CODE,
          Brand: modelData.brand,
          DataOfPurchase: dataWMS.CREATED_DATE
        }])
      } else {
        setData([])
      }
    }).catch((err) => {
      setData([])
    })
  }

  const fetchDataProductGTM = async () => {
    await axios.post(props.gtm_token_url, {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: grant_type,
    }).then((res) => {
      const token = res.data.access_token
      productAPIGTM(token)
    }).catch((err) => {
      console.log(err.response)
    })
  }

  const totalProduct = async() => {
    await axios.get(props.base_url + 'wms-cron', {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }).then((res) => {
      let dataTotal = res.data
      const newDate = DateFormat(res.data.lastCheck, 'day') + ' ' + TimeFormat(res.data.lastCheck)
      const newTotal = numberWithDot(dataTotal.total) 
      setTotalProductData({
        lastCheck: newDate,
        total: newTotal
      })
    })
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(search !== '') {
        setIsLoading(true)
        fetchDataProductGTM()
      } else {
        setSearch('')
      }
    },300);
    return () => clearTimeout(timeOutId);
  }, [search]);

  useEffect(() => {
    totalProduct()
  }, []);

  const List = () => {
    return data.map((item, i) => {
      return <ProductListData key={i} data={item} />;
    });
  };

  return (
    <div className="user-role">
      <h5 className="dashboard title">Product</h5>
      <div className="mt-5">
        <div>
          <div className="d-flex">
            <div className="col-lg-6 col-12 mb-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
            <div className="col-lg-6 col-12 mb-3">
              <div className="d-flex justify-content-end">
                <div className="text-secondary fw-bold">
                  <table>
                    <tr>
                      <td>Last Update</td>
                      <td className="px-3">:</td>
                      <td>
                      {totalProductData.lastCheck}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Product</td>
                      <td className="px-3">:</td>
                      <td>{totalProductData.total}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            {
              isLoading ? 
              <div className="text-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div> 
              :
              search === '' ?
              <div className="text-center mt-3">
                <p>Masukkan Barcode Untuk Mencari Produk</p>
              </div> 
              : data.length !== 0 ?
              <div className="table-responsive">
                <table className="dashboard table">
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Barcode</th>
                      <th>Product ID</th>
                      <th>Brand</th>
                      <th>Product Model</th>
                      <th>Serial Number</th>
                      <th>Created Date</th>
                    </tr>
                  </thead>
                  <List />
                </table>
              </div> 
              :
              <div className="text-center mt-3">
                <p>Product Tidak Ditemukan</p>
              </div> 
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    gtm_url: state.GTM_URL,
    gtm_token_url: state.GTM_TOKEN_URL,
    oapi_url: state.OAPI_URL
  };
};

const mapPropsToState = (dispatch) => ({
  createToken: () => dispatch({ type: 'GET_TOKEN' }),
});

export default connect(mapStateToProps, mapPropsToState)(ProductList);
