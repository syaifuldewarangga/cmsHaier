import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
const regexCheck = (string) => {
    return /^[a-zA-Z0-9]+$/.test(string);
};
const FormUserSales = (props) => {
    const { id } = useParams();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({});
    useEffect(() => {
        // console.log(props.data)
        if (props.data) {
        }
    }, [id]);
    const onSubmit = (e) => {
        e.preventDefault();
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
                                            Nama
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                !!errors?.name
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            aria-label="name"
                                            defaultValue={props?.data?.name}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.name}
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
                                            aria-label="email"
                                            defaultValue={props?.data?.email}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                !!errors?.no_telp
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            aria-label="no_telp"
                                            defaultValue={props?.data?.no_telp}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.no_telp}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Gender
                                        </label>
                                        <select
                                            className={`form-select ${
                                                !!errors?.gender
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            aria-label="gender"
                                            defaultValue={props?.data?.gender}
                                            required
                                        >
                                            <option selected disabled>
                                                -- Select Gender --
                                            </option>
                                            <option value="Pria">Pria</option>
                                            <option value="Wanita">
                                                Wanita
                                            </option>
                                        </select>
                                        <div className="invalid-feedback">
                                            {!!errors?.gender}
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
                                            aria-label="status"
                                            defaultValue={props?.data?.status}
                                            required
                                        >
                                            <option selected disabled>
                                                -- Select Status --
                                            </option>
                                            <option value="active">Active</option>
                                            <option value="not_active">Not Active</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            {!!errors?.status}
                                        </div>
                                    </div>
                                </div>
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
                                            aria-label="password"
                                            defaultValue={props?.data?.password}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {!!errors?.password}
                                        </div>
                                    </div>
                                </div>
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

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL,
        image_url: state.URL,
    };
};

export default connect(mapStateToProps, null)(FormUserSales);
