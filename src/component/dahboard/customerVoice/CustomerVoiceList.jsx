import axios from 'axios';
import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalDelete from '../../modalDelete/ModalDelete';
import CustomerVoiceListData from './CustomerVoiceListData/CustomerVoiceListData';

const CustomerVoiceList = (props) => {
  const [dataID, setDataID] = useState('');
  const [questions, setQuestions] = useState([]);

  const token = localStorage.getItem('access_token');
  const getQuestionFromAPI = async () => {
    await axios
      .get(props.base_url + 'customer-voice-questions', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        let data = res.data;
        setQuestions(data);
      });
  };

  const handleModalDelete = (dataID) => {
    let alertModal = new Modal(document.getElementById('modalDelete'));
    setDataID(dataID);
    alertModal.show();
  };

  const hideModal = () => {
    let alertModal = Modal.getInstance(document.getElementById('modalDelete'));
    alertModal.hide();
  };

  const handleDelete = async (dataID) => {
    let token = localStorage.getItem('access_token');
    await axios
      .delete(props.base_url + 'customer-voice-questions', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          questionId: dataID,
        },
      })
      .then((res) => {
        hideModal();
        getQuestionFromAPI();
      });
  };

  useEffect(() => {
    getQuestionFromAPI();
  }, []);

  const downloadCSV = async () => {
    const request = await axios
      .get(props.base_url + 'customer-voice-answer', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        JSONToCSVConvertor(res.data, 'Data Answer', true);
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
    <div className="">
      <h5 className="dashboard title">Customer Voice</h5>
      <div className="row mt-5">
        <div className="col-lg-12 d-flex justify-content-lg-start mb-3">
          <Link to="/customer-voice/add">
            <button className="btn d-flex justify-content-center btn-add me-3">
              <span class="material-icons-outlined me-3"> add </span>
              <span className="fw-bold">Add Question</span>
            </button>
          </Link>

          <button
            className="btn d-flex justify-content-center btn-show"
            onClick={downloadCSV}
          >
            <span class="material-icons-outlined me-3"> download </span>
            <span className="fw-bold">Export</span>
          </button>
        </div>
      </div>

      <div>
        {questions.map((question) => {
          return (
            <CustomerVoiceListData
              key={question.id}
              data={question}
              remove={handleModalDelete}
            />
          );
        })}
      </div>
      <ModalDelete
        message="are you sure you want to delete this data?"
        dataID={dataID}
        remove={handleDelete}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps)(CustomerVoiceList);
