import axios from 'axios';
import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { permissionCek } from '../../../action/permissionCek';
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

  return (
    <div className="">
      <h5 className="dashboard title">Customer Voice</h5>
      <div className="row mt-5">
        {
          permissionCek(props.user_permission, 'POST_CUSTOMER_VOICE') &&
          <div className="col-lg-12 d-flex justify-content-lg-start mb-3">
            <Link to="/customer-voice/add">
              <button className="btn d-flex justify-content-center btn-add me-3">
                <span class="material-icons-outlined me-3"> add </span>
                <span className="fw-bold">Add Question</span>
              </button>
            </Link>
          </div>
        }
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
    user_permission: state.USER_PERMISSION
  };
};

export default connect(mapStateToProps)(CustomerVoiceList);
