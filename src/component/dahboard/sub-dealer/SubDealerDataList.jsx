import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { permissionCek } from "../../../action/permissionCek";

function SubDealerDataList(props) {
    const { data } = props;
    const user_permission = useSelector((state) => state.USER_PERMISSION);

    return (
        <tbody>
            <tr>
                {permissionCek(user_permission, "UPDATE_WARRANTY_PROMO") &&
                permissionCek(user_permission, "DELETE_USER") ? (
                    <td className="align-middle">
                        <div className="d-flex justify-content-start">
                            {permissionCek(
                                user_permission,
                                "UPDATE_WARRANTY_PROMO"
                            ) && (
                                <Link to={"/sub-dealer/detail/" + data?.id}>
                                    <button className="btn d-flex btn-edit me-3 btn-sm">
                                        <span class="material-icons-outlined md-18">
                                            info
                                        </span>
                                    </button>
                                </Link>
                            )}
                            {permissionCek(
                                user_permission,
                                "UPDATE_WARRANTY_PROMO"
                            ) && (
                                <button
                                    className="btn d-flex btn-warning me-3 btn-sm"
                                    onClick={() =>
                                        props.modalResetPassword(data?.id)
                                    }
                                >
                                    <span class="material-icons-outlined md-18">
                                        restart_alt
                                    </span>
                                </button>
                            )}
                        </div>
                    </td>
                ) : null}

                <td className="align-middle">{data?.first_name + data?.last_name}</td>
                <td className="align-middle">{data?.phone}</td>
                <td className="align-middle">{data?.email}</td>
                <td className="align-middle">{data?.status === 'active' ? 'Active' : 'Not Active'}</td>
            </tr>
        </tbody>
    );
}

export default SubDealerDataList;
