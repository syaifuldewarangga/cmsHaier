import React from 'react';
import ProductListData from './ProductListData/ProdcutListData';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { getToken } from '../../../action/action';

function ProductList(props) {
  const [data, setData] = React.useState([]);
  const [state, setState] = React.useState({
    tempSearch: '',
    search: '',
    isSearch: false,
    dataSearch: [],
  });
  const [border, setBorder] = React.useState(10);
  let dataShowing;
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchData() {
      await axios
        .post(
          props.gtm_url + 'pmtcommondata/GetProductListByCondition',
          {
            Barcode: state.search,
            ProductID: '',
            ProductName: '',
          },
          {
            headers: {
              Authorization: props.token,
              'Content-Type': 'text/plain',
            },
          }
        )
        .then((res) => {
          setData(res.data.data);
        })
        .catch((e) => {
          dispatch(getToken());

          if (e.response) {
            console.log(e.response);
          } else if (e.request) {
            console.log('request : ' + e.request);
          } else {
            console.log('message : ' + e.message);
          }
        });
    }
    fetchData();
  }, [props.token, state.search]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        setState({
          ...state,
          ['search']: state.tempSearch,
        }),
      300
    );
    return () => clearTimeout(timeOutId);
  }, [state.tempSearch]);

  const List = () => {
    dataShowing = data.slice(0, border);
    return dataShowing.map((item, i) => {
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
                  setState({ ...state, ['tempSearch']: e.target.value })
                }
              />
            </div>
            <div className="col-lg-6 d-flex justify-content-lg-end mb-3">
              <button
                className="btn d-flex justify-content-center btn-export"
                onClick={() => setBorder(border + 10)}
              >
                <span className="fw-bold">Load More</span>
              </button>
              <button className="btn d-flex justify-content-center btn-export">
                <span class="material-icons-outlined me-3">
                  {' '}
                  file_download{' '}
                </span>
                <span className="fw-bold">Export</span>
              </button>
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
                    <th>Product</th>
                    <th>Product Model</th>
                    <th>Serial Number</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                {/* {Array.apply(0, Array(border)).map(function (item, i) {
                  console.log(item);
                  return <ProductListData key={i} />;
                })} */}
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
    token: state.GTM_TOKEN,
  };
};

const mapPropsToState = (dispatch) => ({
  createToken: () => dispatch({ type: 'GET_TOKEN' }),
});

export default connect(mapStateToProps, mapPropsToState)(ProductList);
