import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { tableToCSV } from '../../../variable/TableToCSV';
import moment from 'moment'

function Report(props) {
  const [selectReport, setSelectReport] = React.useState('');
  const [date, setDate] = React.useState({
    from: '',
    until: '',
  });
  const [userProductReport, setUserProductReport] = useState([])
  const [customerVoice, setCustomerVoice] = useState([])
  const [promoList, setPromoList] = useState([])

  var token = localStorage.getItem('access_token');

  function exportTableToExcel(tableID, filename = "") {
    let downloadLink;
    const dataType = "application/vnd.ms-excel";
    const tableSelect = document.querySelector(tableID);
    //  console.log(tableSelect);
    const tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

    // Specify file name
    filename = filename ? filename + ".xls" : "excel_data.xls";

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff", tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = "data:" + dataType + ", " + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }

  const downloadReport = async (type = "csv") => {
    if(selectReport === 'user') {
      await axios.get(props.base_url + 'report', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          fromDate: date.from,
          toDate: date.until,
        },
      })
      .then((res) => {
        setUserProductReport(res.data)
        type === "csv" ? tableToCSV('table-user-report', 'Report Total Product dan Total User') : exportTableToExcel('#table-user-report', "Report Total Product dan Total User")
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
        setCustomerVoice(res.data)
        type === "csv" ? tableToCSV('table-customer-voice', 'Report Customer Voice') : exportTableToExcel('#table-customer-voice', "Report Customer Voice")
      })
    }else if (selectReport === 'promo-list'){
      await axios.get(props.base_url + 'extended-warranty-promo/export', {
        headers: {
          Authorization: 'Bearer ' + token
        },
      }).then((res) => {
        setPromoList(res.data)
        type === "csv" ? tableToCSV('table-promo-list', 'Report Promo List') : exportTableToExcel('#table-promo-list', "Report Promo List")
      })
    }
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
              <option value="promo-list">Download Promo List</option>
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
              <div className="ms-3 d-flex">
                <button
                  className="btn btn-export rounded-pill px-4 me-3 d-flex"
                  onClick={() => {
                    selectReport === '' ||
                    date.from === '' ||
                    date.until === '' ||
                    date.from > date.until
                      ? alert('Pilihan anda tidak sesuai')
                      : downloadReport('csv');
                  }}
                >
                  <span class="material-icons-outlined me-2">
                    {' '}
                    cloud_download{' '}
                  </span>
                  <span style={{ fontWeight: '600' }}>CSV</span>
                </button>
                <button
                  className="btn btn-export rounded-pill px-4 d-flex"
                  onClick={() => {
                    selectReport === '' ||
                    date.from === '' ||
                    date.until === '' ||
                    date.from > date.until
                      ? alert('Pilihan anda tidak sesuai')
                      : downloadReport('excel');
                  }}
                >
                  <span class="material-icons-outlined me-2">
                    {' '}
                    cloud_download{' '}
                  </span>
                  <span style={{ fontWeight: '600' }}>Excel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="d-none" id="table-user-report">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Mobile Phone</th>
          <th>NIK</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Birth Date</th>
          <th>Province</th>
          <th>City</th>
          <th>District</th>
          <th>Sub District</th>
          <th>Postal Code</th>
          <th>Address</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Fax</th>
          <th>Source User</th>

          <th>Barcode</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Serial Number</th>
          <th>Purchase Date</th>
          <th>Store Location</th>
          <th>Store Name</th>
          <th>Product Model</th>
          <th>Warranty Card</th>
          <th>Invoice</th>
          <th>Brand</th>
          <th>Category</th>
          <th>WA Flag</th>
          <th>Source Product</th>
          <th>Registration Date</th>
        </tr>
        {
          userProductReport.map((item) => {
            return (
              <Fragment>
                {
                item.products.length === 0 ? 
                  <tr>
                    <td>{ item.first_name }</td>
                    <td>{ item.last_name }</td>
                    <td>{ item.username }</td>
                    <td>'{ item.phone }</td>
                    <td>'{ item.nik }</td>
                    <td>{ item.email }</td>
                    <td>{ item.gender }</td>
                    <td>{ item.birth_date }</td>
                    <td>'{ item.province }</td>
                    <td>{ item.city }</td>
                    <td>{ item.district }</td>
                    <td>{ item.sub_district }</td>
                    <td>{ item.postal_code }</td>
                    <td>{ item.address }</td>
                    <td>{ item.age }</td>
                    <td>{ item.phone_office }</td>
                    <td>{ item.fax }</td>
                    <td>{ !!item.source ? item.source : 'E-Warranty' }</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                  </tr> : 
                  item.products.map((product, productItem) => {
                    return (
                      <tr>
                        <td>{ item.first_name }</td>
                        <td>{ item.last_name }</td>
                        <td>{ item.username }</td>
                        <td>'{ item.phone }</td>
                        <td>'{ item.nik }</td>
                        <td>{ item.email }</td>
                        <td>{ item.gender }</td>
                        <td>{ item.birth_date }</td>
                        <td>{ item.province }</td>
                        <td>{ item.city }</td>
                        <td>{ item.district }</td>
                        <td>{ item.sub_district }</td>
                        <td>{ item.postal_code }</td>
                        <td>{ item.address }</td>
                        <td>{ item.age }</td>
                        <td>'{ item.phone_office }</td>
                        <td>{ item.fax }</td>
                        <td>{ !!item.source ? item.source : 'E-Warranty' }</td>

                        <td>{product.barcode}</td>
                        <td>{product.product_id}</td>
                        <td>{product.product_name}</td>
                        <td>{product.serial_number}</td>
                        <td>{product.date}</td>
                        <td>{product.store_location}</td>
                        <td>{product.store_name}</td>
                        <td>{product.product_model}</td>
                        <td>{!!props.warranty_card ? props.image_url+product.warranty_card : ''}</td>
                        <td>{props.image_url+product.invoice}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>{product.agreements}</td>
                        <td>{ !!product.source ? product.source : 'E-Warranty' }</td>
                        <td>{moment(product.created_at).format('DD/MM/YYYY')}</td>
                        
                      </tr>
                    )
                  })
                }
              </Fragment>
            )
          })
        }
      </table>

      <table className='d-none' id="table-customer-voice">
        <tr>
          <th>Name</th>
          <th>Question</th>
          <th>Answer</th>
          <th>Created At</th>
        </tr>
        {
          customerVoice.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.question}</td>
              <td>{item.answer}</td>
              <td>{item.created_at}</td>
            </tr>
          ))
        }
      </table>

      <table className="d-none" id="table-promo-list">
        <tr>
          <th>NO</th>
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Product Model</th>
          <th>Start Program</th>
          <th>End Program</th>
          <th>Start Purchase</th>
          <th>End Purchase</th>
          <th>Ex Warranty Days</th>
          <th>Ex Warranty Days Text</th>
          <th>Notification Text</th>
          <th>Status</th>
          <th>Created At</th>
          
        </tr>
        {
          promoList.map((item, i) => {
            return (
              <tr>
                <td>{ i+1 }</td>
                <td>
                  {item.thumbnail !== null ? <a href={props.image_url + item.thumbnail} target="_blank" >{props.image_url + item.thumbnail}</a> : '-'}
                </td>
                <td>{ item.name }</td>
                <td>{ item.product_model }</td>
                <td>{ moment(item.start_program).format("DD/MM/YYYY")  }</td>
                <td>{ moment(item.end_program).format("DD/MM/YYYY")  }</td>
                <td>{ moment(item.start_purchase).format("DD/MM/YYYY")  }</td>
                <td>{ moment(item.end_purchase).format("DD/MM/YYYY")  }</td>
                <td>{ item.ex_warranty_days }</td>
                <td>{ item.ex_warranty_days_text }</td>
                <td>{ item.notification_text }</td>
                <td>{ item.is_active ? 'Aktif' : 'Tidak Aktif' }</td>
                <td>{ moment(item.created_at).format("DD/MM/YYYY")  }</td>
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
    image_url: state.URL
  };
};

export default connect(mapStateToProps, null)(Report);
