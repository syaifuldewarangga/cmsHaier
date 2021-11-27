import axios from "axios";
import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AlertModal from "../../alertModal/AlertModal";


const WebConfig = (props) => {
    const [data, setData] = useState('');
    const [alertData, setAlertData] = useState({
        status: 'success',
        title: 'Success',
        subtitle: 'Success update data'
    });

    const [errorData, setErrorData] = useState({
        apiKey: '',
        clientId: '',
        senderId: ''
    });

    const token = localStorage.getItem('access_token');

    const getConfigFromAPI = async () => {
        await axios.get(props.base_url + 'api-panel', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            setData(res.data)
        })
    }

    useEffect(() => {
        getConfigFromAPI()
    }, [])

    const showAlertModal = () => {
        let alertModal = new Modal(document.getElementById('alertModal'))
        alertModal.show()
    }

    const onChangeInput = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const ModalConfirmation = () => {
        return (
            <div className="modal fade" id="modalConfirm" tabindex="-1" aria-labelledby="modalConfirmLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center">
                                Are you sure want to update this data ?
                                <div className="mt-3">
                                    <button id="closeModalConfirm" type="button" class="btn btn-outline-dark mx-3"  data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                    <button 
                                        type="button" 
                                        class="btn btn-outline-danger mx-3"
                                        onClick={insertDataToAPI}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let confirmModal = new Modal(document.getElementById('modalConfirm'))
        confirmModal.show()
    }

    const insertDataToAPI = async () => {
        document.getElementById('closeModalConfirm').click()
        let formData = new FormData()

        formData.append('apiKey', data.apiKey)
        formData.append('clientId', data.clientId)
        formData.append('senderId', data.senderId)

        await axios.put(props.base_url + 'api-panel', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            showAlertModal()
        }).catch((err) => {
            console.log(err.data)
        })
    }

    return (
        <div className="form-web-config">
            <div className="card">
                <div className="card-header btn-import">
                     <h5 className="dashboard title" style={{ margin: '0', padding: '7px 0' }} >
                        Web Config
                    </h5>
                </div>

                <div className="card-body">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label class="form-label">API KEY</label>
                                    <input 
                                        type="text" 
                                        class={`form-control ${errorData.apiKey !== '' ? 'is-invalid' : null} `}
                                        name="apiKey"
                                        value={data.apiKey}
                                        onChange={onChangeInput}
                                    />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label class="form-label">Client ID</label>
                                    <input 
                                        type="text" 
                                        class={`form-control ${errorData.clientId !== '' ? 'is-invalid' : null} `}
                                        name="clientId"
                                        value={data.clientId}
                                        onChange={onChangeInput}
                                    />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label class="form-label">Sender ID</label>
                                    <input 
                                        type="text" 
                                        class={`form-control ${errorData.senderId !== '' ? 'is-invalid' : null} `}
                                        name="senderId"
                                        value={data.senderId}
                                        onChange={onChangeInput}
                                    />
                                </div>

                                <div className="d-grid gap-2 col-lg-12">
                                    <button className="btn btn-import" type="submit">
                                        Save Config
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <AlertModal 
                data = {alertData}
            />
            <ModalConfirmation />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
}

export default  connect(mapStateToProps, null) (WebConfig)