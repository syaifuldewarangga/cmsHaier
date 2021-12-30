import React from 'react';
import ProductListData from './ProductListData/ProdcutListData';
import axios from 'axios';
import { connect } from 'react-redux';
import { client_id, client_secret, grant_type } from '../../../variable/GlobalVariable';

function ProductList(props) {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState('');

  async function productAPIGTM(gtmToken) {
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
      setData(res.data.data);
    })
    .catch((e) => {
      console.log(e.response)
    });
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

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(search !== '') {
        fetchDataProductGTM()
      } else {
        setSearch('')
      }
    },300);
    return () => clearTimeout(timeOutId);
  }, [search]);

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
          <div className="row">
            <div className="d-flex col-lg-6 col-12 mb-3">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="table-responsive">
              <table className="dashboard table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Barcode</th>
                    <th>Product ID</th>
                    <th>Brand</th>
                    <th>Product Name</th>
                    <th>Product Model</th>
                    <th>Serial Number</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <List />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    gtm_url: state.GTM_URL,
    gtm_token_url: state.GTM_TOKEN_URL
  };
};

const mapPropsToState = (dispatch) => ({
  createToken: () => dispatch({ type: 'GET_TOKEN' }),
});

export default connect(mapStateToProps, mapPropsToState)(ProductList);
