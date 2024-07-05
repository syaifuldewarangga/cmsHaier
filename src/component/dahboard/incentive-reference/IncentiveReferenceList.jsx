import axios from "axios";
import { Modal } from "bootstrap";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { permissionCek } from "../../../action/permissionCek";
import useToken from "../../../hooks/useToken";
import Pagination from "../../pagination/Pagination";
import IncentiveReferenceDataList from "./IncentiveReferenceDataList";
import ModalConfirm from "./ModalConfirm";
import "./style.css";

function IncentiveReferenceList(props) {
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const user_permission = useSelector((state) => state.USER_PERMISSION);
    const history = useHistory()
    const token = useToken()

    const [dataID, setDataID] = useState("");
    const [data, setData] = useState();

    const [totalPage, setTotalPage] = useState(0);
    const [tempSearch, setTempSearch] = useState("");
    const [params, setParams] = useState({
        search: "",
        page: 1,
        limit: 10,
    });

    const fetchData = async () => {
        setData();
        try {
            const res = await axios.get(API_URL + "incentive", {
                headers: {
                    Authorization: "Bearer " + token,
                },
                params: {
                    ...params,
                },
            });
            setData([...res.data.data.data]);
            setTotalPage(res.data.data.meta.last_page);
        } catch (error) {
        } finally {
        }
    };

    React.useEffect(() => {
        const timeOutId = setTimeout(
            () =>
                setParams({
                    ...params,
                    page: 1,
                    search: tempSearch,
                }),
            500
        );
        return () => clearTimeout(timeOutId);
    }, [tempSearch]);

    React.useEffect(() => {
        let mounted = true;
        if (mounted && token) {
            fetchData();
        }

        return () => (mounted = false);
    }, [params, token]);

    const handleChangePage = (value) => {
        setParams({
            ...params,
            page: parseInt(value),
        });
    };

    const handleModalDelete = (dataID) => {
        setDataID(dataID);
        let alertModal = new Modal(document.getElementById("modalConfirm"));
        alertModal.show();
    };
    const hideModal = () => {
        let alertModal = Modal.getInstance(
            document.getElementById("modalConfirm")
        );
        alertModal.hide();
    };
    const [loadingDelete, setLoadingDelete] = useState(false)
    const handleDelete = async () => {
        setLoadingDelete(true)
        try {
          const res = await axios.delete(`${API_URL}incentive/${dataID}`, {
              headers: {
                  Authorization: "Bearer " + token,
              },
          })
          hideModal()
          history.push('/incentive-product')
        } catch (error) {
          
        } finally {
          setLoadingDelete(false)
        }
    };

    const renderData = useMemo(() => {
      if(!data) return (
          <tbody>
              <tr>
                  <td colSpan={4}>
                      <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                  Loading...
                              </span>
                          </div>
                      </div>
                  </td>
              </tr>
          </tbody>
      );
      if(data.length === 0) return (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <div className="d-flex justify-content-center">
                            <p>Data Not Found. {tempSearch !== '' ? <b>{tempSearch}</b> : ''}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
      )
      return data.map((v, i) => {
          return (
            <IncentiveReferenceDataList
                remove={handleModalDelete}
                key={v?.id}
                data={v}
            />
          )
      })
    }, [data])

    return (
        <div className="user-list">
            <h5 className="dashboard title">Incentive Reference</h5>
            <div className="mt-5">
                <div>
                    <div className="row justify-content">
                        <div className="d-flex col-lg-6 col-12 mb-3">
                            <input
                                class="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="search"
                                onChange={(e) => setTempSearch(e.target.value)}
                            />
                        </div>
                        <div className="col-lg-6 d-flex mb-3 justify-content-lg-end">
                            <Link to="/incentive-reference/add">
                                <button className="btn d-flex justify-content-center btn-add">
                                    <span class="material-icons-outlined me-3">
                                        {" "}
                                        add{" "}
                                    </span>
                                    <span className="fw-bold">
                                        Add Incentive Reference
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card">
                        <div className="table-responsive">
                            <table className="dashboard table">
                                <thead>
                                    <tr>
                                        {permissionCek(
                                            user_permission,
                                            "DELETE_WARRANTY_PROMO"
                                        ) === true ||
                                        permissionCek(
                                            user_permission,
                                            "UPDATE_USER"
                                        ) === true ? (
                                            <th>Action</th>
                                        ) : null}
                                        <th>Month</th>
                                        <th>Year</th>
                                        <th>Product Model Count</th>
                                    </tr>
                                </thead>
                                {renderData}
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                  {data?.length > 0 ?
                    <Pagination
                        currentPage={params.page}
                        totalPage={totalPage}
                        changePage={handleChangePage}
                    />
                  : null
                  }
                </div>
                <ModalConfirm
                    isLoading={loadingDelete}
                    message="are you sure you want to delete this data?"
                    remove={handleDelete}
                />
            </div>
        </div>
    );
}


export default IncentiveReferenceList;
