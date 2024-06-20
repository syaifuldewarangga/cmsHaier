import axios from "axios";
import { Modal } from "bootstrap";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { permissionCek } from "../../../action/permissionCek";
import useToken from "../../../hooks/useToken";
import ModalDelete from "../../modalDelete/ModalDelete";
import Pagination from "../../pagination/Pagination";
import ModalResetPassword from "./ModalResetPassword";
import SubDealerDataList from "./SubDealerDataList";
import "./SubDealerList.css";

function SubDealerList({ created_by = null }) {
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const user_permission = useSelector((state) => state.USER_PERMISSION);
    const token = useToken()

    const [dataID, setDataID] = useState("");
    const [data, setData] = useState();

    const [totalPage, setTotalPage] = useState(0);
    const [tempSearch, setTempSearch] = useState("");
    const [params, setParams] = useState({
        search: "",
        page: 1,
        limit: 10,
        role: ["dealer"],
        created_by: !!created_by ? created_by : ''
    });

    const fetchData = async () => {
        setData();
        try {
            const res = await axios.get(API_URL + "user", {
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
            page: value,
        });
    };

    const handleModalResetPassword = (dataID) => {
        setDataID(dataID);
        let alertModal = new Modal(
            document.getElementById("modalResetPassword")
        );
        alertModal.show();
    };

    const renderData = useMemo(() => {
      if(!data) return (
          <tbody>
              <tr>
                  <td colSpan={5}>
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
                    <td colSpan={5}>
                        <div className="d-flex justify-content-center">
                            <p>Data Not Found. {tempSearch !== '' ? <b>{tempSearch}</b> : ''}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
      )
      return data.map((v, i) => {
          return (
            <SubDealerDataList
                modalResetPassword={handleModalResetPassword}
                key={v?.id}
                data={v}
            />
          )
      })
    }, [data])

    return (
        <div className="user-list">
            <h5 className="dashboard title">Sub Dealer</h5>
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
                                        <th>Dealer Name</th>
                                        <th>Phone Number</th>
                                        <th>Dealer Email</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                {renderData}
                            </table>
                        </div>
                    </div>
                </div>

                {data?.length > 0 ?
                    <div className="mt-3">
                    <Pagination
                            currentPage={params.page}
                            totalPage={totalPage}
                            changePage={handleChangePage}
                        />
                    </div>
                : null
                }
                <ModalResetPassword id={dataID} />
            </div>
        </div>
    );
}


export default SubDealerList;
