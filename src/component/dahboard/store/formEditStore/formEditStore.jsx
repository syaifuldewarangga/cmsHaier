import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function FormEditStore(props) {
  const token = localStorage.getItem('access_token');
  const [data, setData] = useState({
    open_day: '',
    close_day: '',
    open_hour: '',
  });
  const getStoreFromAPI = async () => {
    await axios
      .get(props.base_url + 'store', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          store_id: props.storeID,
        },
      })
      .then((res) => {
        const respondData = res.data;
        setData({
          ['open_day']: respondData.open_day,
          ['close_day']: respondData.close_day,
          ['open_hour']: respondData.open_hour,
        });
      })
      .catch((err) => {
        setData({
          ['open_day']: '',
          ['close_day']: '',
          ['open_hour']: '',
        });
      });
  };
  useEffect(() => {
    // console.log(props.storeID);
    if(props.storeID !== '') {
      getStoreFromAPI();
    }
  }, [props.storeID]);

  const [errorData, setErrorData] = useState({
    open_day: '',
    close_day: '',
    open_hour: '',
  });
  const open_day_data = ['Senin-Jumat', 'Senin-Sabtu', 'Senin-Minggu'];
  const close_day_data = [
    'Sabtu, Minggu, Hari Libur Nasional',
    'Minggu, Hari Libur Nasional',
    'Hari Libur Nasional',
  ];

  const onChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const hideModal = () => {
    document.getElementById('closeFormStoreModal').click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      store_id: props.storeID,
      open_day: data.open_day,
      close_day: data.close_day,
      open_hour: data.open_hour,
      close_hour: '00:00',
    });
    console.log(body);
    await axios
      .post(props.base_url + 'store', body, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        // alert('Succes!');
        hideModal();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div
      class="modal fade"
      id="formEditStore"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="formEditStore"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header btn-import">
            <h5 class="modal-title" id="staticBackdropLabel">
              Edit Operation Hours
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label class="form-label">Open Day</label>
                <select
                  class={`form-select ${
                    errorData.open_day !== '' ? 'is-invalid' : null
                  }`}
                  name="open_day"
                  onChange={onChangeInput}
                >
                  <option
                    selected={data.open_day === '' ? 'selected' : null}
                    disabled
                  >
                    -- Select Open Day --
                  </option>
                  {open_day_data.map(function (item, i) {
                    return (
                      <option
                        value={item}
                        key={i}
                        selected={data.open_day === item ? 'selected' : null}
                      >
                        {item}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-feedback">{errorData.open_day}</div>
              </div>

              <div className="mb-3">
                <label class="form-label">Close Day</label>
                <select
                  class={`form-select ${
                    errorData.close_day !== '' ? 'is-invalid' : null
                  }`}
                  name="close_day"
                  onChange={onChangeInput}
                >
                  <option
                    selected={data.close_day === '' ? 'selected' : null}
                    disabled
                  >
                    -- Select Close Day --
                  </option>
                  {close_day_data.map(function (item, i) {
                    return (
                      <option
                        value={item}
                        key={i}
                        selected={data.close_day === item ? 'selected' : null}
                      >
                        {item}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-feedback">{errorData.close_day}</div>
              </div>

              <div className="mb-3">
                <label class="form-label">Operational Hour</label>
                <input
                  type="text"
                  class={`form-control ${
                    errorData.open_hour !== '' ? 'is-invalid' : null
                  } `}
                  name="open_hour"
                  value={data.open_hour}
                  onChange={onChangeInput}
                  max="50"
                />
                <div className="invalid-feedback">{errorData.open_hour}</div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-import me-3"
                  data-bs-dismiss="modal"
                  id="closeFormStoreModal"
                  type="button"
                >
                  Cancel
                </button>
                <button className="btn btn-import" type="submit">
                  Save
                </button>
              </div>
            </form>
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

export default connect(mapStateToProps, null)(FormEditStore);
