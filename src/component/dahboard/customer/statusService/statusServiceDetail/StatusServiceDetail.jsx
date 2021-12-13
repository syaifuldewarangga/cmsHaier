import React from 'react';
import './StatusServiceDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
var X2JS = require('x2js');

function StatusServiceDetail() {
  const { srNumber, phone_number } = useParams();
  const xtojson = new X2JS();
  const [data, setData] = React.useState('');
  React.useEffect(() => {
    const getData = async () => {
      const fd = new FormData();

      fd.append('SRNum', srNumber);
      fd.append('MobilePhone', phone_number);

      await axios
        .post('https://e-warranty.click/oapi/gsis/checkhsisrstatus', fd, {
          headers: {
            Accept: 'application/xml',
          },
        })
        .then((res) => {
          var json = xtojson.xml2js(res.data);
          let cek_error = json.Envelope.Body.CheckHSISRStatus_Output;
          //   console.log(cek_error);
          if (cek_error.ErrorCode.__text !== '0') {
            console.log(cek_error.ErrorMessage.__text);
            alert(cek_error.ErrorMessage.__text);
          } else {
            setData(
              json.Envelope.Body.CheckHSISRStatus_Output.ListOfServiceRequest
                .ServiceRequest
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);
  return (
    <div className="status-service-detail">
      <h5 className="dashboard title">Status Service</h5>
      <div className="mt-5">
        <div className="d-lg-flex justify-content-center">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <h4 className="title">Browse Repair Service</h4>
                </div>
                <div className="row mt-5">
                  <div className="col-lg-6">
                    <div className="card header-title-status">
                      <p className="text-uppercase">Repair Status Service</p>
                    </div>
                    <div className="content mt-4">
                      <div>
                        <h6>Request Date : </h6>
                        <p>{data.RequestDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card header-title-status">
                      <p className="text-uppercase">Product Information</p>
                    </div>
                    <div className="content mt-4">
                      <div>
                        <h6>Product </h6>
                        <p>{data.Category}</p>
                      </div>
                      <div className="mt-4">
                        <h6>Model </h6>
                        <p>{data.ProductModel}</p>
                      </div>
                      <div className="mt-4">
                        <h6>Serial Number </h6>
                        <p>{data.serialNumber}</p>
                      </div>
                      <div className="mt-4">
                        <h6>Date of Purchase </h6>
                        <p>{data.DOP}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body header-title-status">
                        <div>
                          <h5 style={{ color: '#8D8D8D' }}>
                            Status Information
                          </h5>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                          <table className="table table-white mt-3">
                            <thead>
                              <tr>
                                <th scope="col">Number</th>
                                <th scope="col">Status</th>
                                <th scope="col">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data === ''
                                ? null
                                : data.ListOfRepair.Repair.map((item) => {
                                    return (
                                      <tr>
                                        <td className="text-nowrap">
                                          {item.ChangedNo}
                                        </td>
                                        <td className="text-nowrap">
                                          {item.ChangedStatus}
                                        </td>
                                        <td className="text-nowrap">
                                          {item.StatusChangeDate}
                                        </td>
                                      </tr>
                                    );
                                  })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusServiceDetail;
