import React, { useEffect, useState } from 'react';
import StoreListData from './StoreListData/StoreListData';
import axios from 'axios';
import { connect } from 'react-redux';
import FormEditStore from './formEditStore/formEditStore';
import { permissionCek } from '../../../action/permissionCek';
import { client_id, client_secret, grant_type } from '../../../variable/GlobalVariable';

function StoreList(props) {
  const [data, setData] = useState([]);
  const [storeID, setStoreID] = useState('')
  const [state, setState] = useState({
    tempSearch: '',
    search: '',
    isSearch: false,
    dataSearch: [],
  });
  const [border, setBorder] = useState(10);
  let dataShowing;

  async function storeAPIGTM(gtmToken) {
    await axios.post(props.gtm_url + 'pmtcommondata/GetStoreListByCondition',
      {
        StoreName: state.search,
        StoreID: '',
        StoreCode: '',
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

  const fetchDataStoreGTM = async () => {
    await axios.post(props.gtm_token_url, {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: grant_type,
    }).then((res) => {
      const token = res.data.access_token
      storeAPIGTM(token)
    }).catch((err) => {
      console.log(err.response)
    })
  }

  useEffect(() => {
    fetchDataStoreGTM();
  }, [props.token, state.search]);

  useEffect(() => {
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
      return <StoreListData 
        data={item} 
        key={i} 
        handleStoreID = {(ID) => setStoreID(ID)}
      />;
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
                    {
                      permissionCek(props.user_permission, 'POST_STORE') &&
                      <th width="9%">Action</th>
                    }
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
      <FormEditStore
        storeID={storeID}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    gtm_url: state.GTM_URL,
    gtm_token_url: state.GTM_TOKEN_URL,
    user_permission: state.USER_PERMISSION
  };
};

const mapPropsToState = (dispatch) => ({
  createToken: () => dispatch({ type: 'GET_TOKEN' }),
});

export default connect(mapStateToProps, mapPropsToState)(StoreList);
