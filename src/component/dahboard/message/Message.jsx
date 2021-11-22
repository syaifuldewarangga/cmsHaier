import axios from "axios";
import { Modal } from "bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalDelete from "../../modalDelete/ModalDelete";
import Pagination from "../../pagination/Pagination";
import MessageListData from "./MesageListData/MessageListData";
import './Message.css'

class Message extends Component
{
    constructor(props){
        super(props);
        this.timeout =  0;
    }

    state = ({
        messages: [],
        dataID: '',
        currentPage: 0,
        totalPage: 0,
    })

    getMessage = async () => {
        const token = localStorage.getItem('access_token');
        await axios.get(this.props.base_url + 'message', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                page: this.state.currentPage,
                itemPerPage: 10
            }
        })
        .then((result) => {
            const data = result.data
            this.setState({
                messages: data.content,
                currentPage: result.data.number,
                totalPage: result.data.totalPages,
            })
        }).catch((errors) => {
            console.log(errors)
        })
    }

    handleModalDelete = (dataID) => {
        this.setState({
            dataID: dataID
        })

        let alertModal = new Modal(document.getElementById('modalDelete'));
        alertModal.show();
    }

    hideModal = () => {
        document.getElementById('closeModalDelete').click()
    }

    handleDelete = (dataID) => {
        const token = localStorage.getItem('access_token');
        axios.delete(this.props.base_url + 'message', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                id: dataID
            }
        })
        .then((res) => {
            this.hideModal()
            this.getMessage()
        })
    }

    doSearch = (event) => {
        var searchText = event.target.value
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if(searchText !== '') {
              this.searchMessageFromApi(searchText)
            } else {
              this.getMessage()
            }
          }, 500);
    }

    searchMessageFromApi = async (search) => {
        var token = localStorage.getItem('access_token')
        await axios.get(this.props.base_url + 'message/search', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                param: search
            }
        }).then((res) => {
            let data = res.data
            this.setState({
                messages: data
            })
        })
    }

    componentDidMount() {
        this.getMessage()
    }

    handleChangePage = (value) => {
        let newPage = value - 1
        this.setState({
            currentPage : newPage
        }, () => {
            this.getMessage()
        })
    }
    render () {
        return  (
            <div className="dashboard-message">
                <h5 className="dashboard title" >Message</h5>
                <div className="mt-5">
                    <div>
                        <div className="row">
                            <div className="d-flex col-lg-6 col-12 mb-3">
                                <input 
                                    className="form-control me-2" 
                                    type="search" 
                                    placeholder="Search" 
                                    aria-label="Search" 
                                    onChange={event => this.doSearch(event)}
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
                                            <th>Action</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.messages.map((message) => (
                                                <MessageListData 
                                                    key={message.id}
                                                    data={message}
                                                    remove={this.handleModalDelete}
                                                />
                                            ))
                                        }
                                    </tbody>  
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <Pagination 
                        currentPage={this.state.currentPage + 1}
                        totalPage={this.state.totalPage}
                        changePage = {this.handleChangePage}
                    />
                </div>
                <ModalDelete 
                    message="are you sure you want to delete this data?"
                    dataID={this.state.dataID}
                    remove = {this.handleDelete}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL,
    }
}
export default connect(mapStateToProps)(Message)