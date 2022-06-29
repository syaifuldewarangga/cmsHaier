import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const FormImportPromo = (props) => {
  var token = localStorage.getItem('access_token');
  const [file, setFile] = React.useState();

  const uploadExcel = async (event) => {
    const fileFormdata = new FormData();
    fileFormdata.append('file', file);

    const request = await axios
      .post(props.base_url + 'extended-warranty-promo/excel', fileFormdata, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('Berhasil');
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
    return request;
  };

  return (
    <div
      className="modal fade"
      id="formImportServiceCenter"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="formImportServiceCenter"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header btn-import">
            <h5 className="modal-title" id="staticBackdropLabel">
              {' '}
              Import Excel{' '}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div className="mb-3">
                <label className="form-label">Select Excel</label>
                <input
                  className="form-control"
                  type="file"
                  accept=".csv, .xls, .xlsx"
                  onChange={(item) => setFile(item.target.files[0])}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-import me-3"
                data-bs-dismiss="modal"
                id="closeCategoryModal"
              >
                Cancel
              </button>
              <button className="btn btn-import" onClick={uploadExcel}>
                Import
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, null)(FormImportPromo);
