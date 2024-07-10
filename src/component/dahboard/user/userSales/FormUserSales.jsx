import axios from "axios";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import useToken from "../../../../hooks/useToken";

const FormUserSales = (props) => {
    const { data } = props
    const { id } = useParams();
    const history = useHistory();
    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const { token } = useToken()

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({});

    const save = async ({ formData, id }) => {
        try {
            let res = {}
            if(!!id){
                const formDataObj = Object.fromEntries(formData)
                res = await axios.patch(`${API_URL}user/sales/${id}`, {}, {
                    params: formDataObj,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            }else{
                res = await axios.post(`${API_URL}user/sales`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            }
            alert('Berhasil!')
            history.push('/user-sales')
        } catch (error) {
            setErrors(error?.response?.data?.errors)
        } finally {
            setIsLoading(false)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData(e.target)
        
        save({ formData, id })
    };

    return (
        <div>
            <div className="form-user">
                <div className="card ">
                    <div className="card-header btn-import">
                        <h5
                            className="dashboard title"
                            style={{ margin: "0", padding: "7px 0" }}
                        >
                            {props.title}
                        </h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                !!errors?.first_name
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="first_name"
                                            defaultValue={data?.first_name}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.first_name ? errors?.first_name[0] : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                !!errors?.last_name
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="last_name"
                                            defaultValue={data?.last_name}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.last_name ? errors?.last_name[0] : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                !!errors?.phone
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="phone"
                                            defaultValue={data?.phone}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.phone ? errors?.phone[0] : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                !!errors?.email
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="email"
                                            defaultValue={data?.email}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.email ? errors?.email[0] : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            className={`form-select ${
                                                !!errors?.status
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="status"
                                            defaultValue={data?.status}
                                            required
                                        >
                                            <option selected disabled>
                                                -- Select Status --
                                            </option>
                                            <option value="active">Active</option>
                                            <option value="not_active">Not Active</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            {!!errors?.status ? errors?.status[0] : ''}
                                        </div>
                                    </div>
                                </div>
                                {!data ?
                                <>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className={`form-control ${
                                                    !!errors?.password
                                                        ? "is-invalid"
                                                        : null
                                                }`}
                                                name="password"
                                                defaultValue={data?.password}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {!!errors?.password ? errors?.password[0] : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Password Confirmation
                                            </label>
                                            <input
                                                type="password"
                                                className={`form-control ${
                                                    !!errors?.password_confirmation
                                                        ? "is-invalid"
                                                        : null
                                                }`}
                                                name="password_confirmation"
                                                defaultValue={data?.password_confirmation}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {!!errors?.password_confirmation ? errors?.password_confirmation[0] : ''}
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null
                                }
                                <div className="col-6">
                                    <Link to="/user-sales">
                                        <div className="d-grid gap-2">
                                            <button
                                                className="btn btn-outline-import"
                                                type="button"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                                <div className="d-grid gap-2 col-6">
                                    <button
                                        className="btn btn-import"
                                        type="submit"
                                        disabled={isLoading && "disabled"}
                                    >
                                        {isLoading ? (
                                            <Fragment>
                                                <span
                                                    class="spinner-border spinner-border-sm me-1  "
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Loading...
                                            </Fragment>
                                        ) : props.title === "Edit User Sales" ? (
                                            "Save"
                                        ) : (
                                            "Create"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormUserSales;
