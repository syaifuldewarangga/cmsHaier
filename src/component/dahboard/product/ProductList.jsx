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

  async function fetchData(type = null) {
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
        if(type === 'download') {
          JSONToCSVConvertor(res.data.data, 'Product', true);
        } else {
          setData(res.data.data);
        }
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

  React.useEffect(() => {
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

  const downloadCSV = () => {
    fetchData('download');
  }
  const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    var arrData =
      typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';

    if (ShowLabel) {
      var row = '';

      for (var index in arrData[0]) {
        row += index + ',';
      }

      row = row.slice(0, -1);

      CSV += row + '\r\n';
    }

    for (var i = 0; i < arrData.length; i++) {
      var row = '';

      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      CSV += row + '\r\n';
    }

    if (CSV === '') {
      alert('Invalid data');
      return;
    }

    var fileName = 'Data_';
    fileName += ReportTitle.replace(/ /g, '_');

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    var link = document.createElement('a');
    link.href = uri;

    link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                onClick={downloadCSV}
              >
                <span class="material-icons-outlined me-3">
                  file_download
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
                    <th>Product Name</th>
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
          <div className="d-grid gap-2 mt-3">
            <button
              className="btn d-flex justify-content-center btn-export"
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

export default connect(mapStateToProps, mapPropsToState)(ProductList);
