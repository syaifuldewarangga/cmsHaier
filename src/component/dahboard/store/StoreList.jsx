import React from 'react';
import StoreListData from './StoreListData/StoreListData';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { getToken } from '../../../action/action';

function StoreList(props) {
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
      const request = await axios
        .post(
          props.gtm_url + 'pmtcommondata/GetStoreListByCondition',
          {
            StoreName: state.search,
            StoreID: '',
            StoreCode: '',
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
      return request;
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
      return <StoreListData data={item} key={i} />;
    });
  };

  return (
    <div className="user-role">
      <h5 className="dashboard title">Store</h5>
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
          </div>
        </div>

        <div>
          <div className="card">
            <div className="table-responsive">
              <table className="dashboard table">
                <thead>
                  <tr>
                    <th width="9%">Action</th>
                    <th>Store Name</th>
                    <th>Phone Office</th>
                    <th>Province</th>
                    <th>City</th>
                    <th>District</th>
                    <th>Street</th>
                    {/* <th>Operational</th>
                    <th>Office Hours</th> */}
                  </tr>
                </thead>
                <List />
              </table>
            </div>
          </div>
          <div className="d-grid gap-2 my-3">
            <button
              className="btn btn-export"
              onClick={() => setBorder(border + 10)}
            >
              <span className="fw-bold">Load More</span>
            </button>
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

export default connect(mapStateToProps, mapPropsToState)(StoreList);
