import axios from "axios";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { permissionCek } from "../../../../action/permissionCek";
import useToken from "../../../../hooks/useToken";
import Pagination from "../../../pagination/Pagination";
import UserSalesDataList from "./UserSalesDataList";
import "./UserSalesList.css";

function UserSalesList() {
    // const token = useToken()
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const user_permission = useSelector(state => state.USER_PERMISSION)
    const token = useToken()

    const [data, setData] = useState();

    const [totalPage, setTotalPage] = useState(0);
    const [tempSearch, setTempSearch] = useState("");
    const [params, setParams] = useState({
        search: "",
        page: 1,
        limit: 10,
        role: ["sales"],
    });

    const fetchData = async () => {
        setData()
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
        if (mounted && !!token) {
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
              <UserSalesDataList
                  key={i}
                  data={v}
              />
          )
      })
    }, [data])

    return (
        <div className="user-list">
            <h5 className="dashboard title">User Sales</h5>
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
                            <Link to="/user-sales/add">
                                <button className="btn d-flex justify-content-center btn-add">
                                    <span class="material-icons-outlined me-3">
                                        {" "}
                                        add{" "}
                                    </span>
                                    <span className="fw-bold">
                                        Add User Sales
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
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                {renderData}
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <Pagination
                        currentPage={params.page}
                        totalPage={totalPage}
                        changePage={handleChangePage}
                    />
                </div>

            </div>
        </div>
    );
}

export default UserSalesList;
