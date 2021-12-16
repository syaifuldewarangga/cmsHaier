import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

function Report(props) {
  const [selectReport, setSelectReport] = React.useState('');
  const [date, setDate] = React.useState({
    from: '',
    until: '',
  });

  var token = localStorage.getItem('access_token');

  const downloadCSV = async () => {
    // const route =
    //   selectReport === 'user'
    //     ? 'register-customer/export'
    //     : 'register-product/export';

    if(selectReport === 'user') {
      await axios.get(props.base_url + '/report', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          fromDate: date.from,
          toDate: date.until,
        },
      })
      .then((res) => {
        console.log(res);
        JSONToCSVConvertor(res.data, 'Data Total User & Total Product', true);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        } else if (e.request) {
          console.log('request : ' + e.request);
        } else {
          console.log('message : ' + e.message);
        }
      });
    } else if (selectReport === 'customer-voice') {
      await axios.get(props.base_url + 'customer-voice-export', {
        headers: {
          Authorization: 'Bearer ' + token
        },
        params: {
          startDate: date.from,
          endDate: date.until
        }
      }).then((res) => {
        JSONToCSVConvertor(res.data, 'Data Customer Voice', true);
      })
    }
    
    
  };

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

    var fileName = 'Report_';
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
    <div>
      <h5 className="dashboard title">Report</h5>
      <div className="mt-5">
        <div className="row">
          <div className="col-lg-5">
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => setSelectReport(e.target.value)}
            >
              <option value="" selected>
                Select Report
              </option>
              <option value="user">Download Total Product & Total User</option>
              <option value="customer-voice">Download Customer Voice</option>
            </select>
          </div>
          <div className="col-lg-7">
            <div className="d-flex align-items-center">
              <div className="col">
                <input
                  type="date"
                  class="form-control"
                  onChange={(e) => {
                    setDate({
                      ...date,
                      ['from']: dateFormat(e.target.value, 'yyyy/mm/dd'),
                    });
                  }}
                />
              </div>
              <div>
                <span className="mx-3">to</span>
              </div>
              <div className="col">
                <input
                  type="date"
                  class="form-control"
                  onChange={(e) => {
                    setDate({
                      ...date,
                      ['until']: dateFormat(e.target.value, 'yyyy/mm/dd'),
                    });
                  }}
                />
              </div>
              <div className="ms-3">
                <button
                  className="btn btn-export rounded-pill px-4 me-3 d-flex"
                  onClick={() => {
                    selectReport === '' ||
                    date.from === '' ||
                    date.until === '' ||
                    date.from > date.until
                      ? alert('Pilihan anda tidak sesuai')
                      : downloadCSV();
                  }}
                >
                  <span class="material-icons-outlined me-2">
                    {' '}
                    cloud_download{' '}
                  </span>
                  <span style={{ fontWeight: '600' }}>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(Report);
