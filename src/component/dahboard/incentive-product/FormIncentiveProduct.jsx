import axios from "axios";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import useToken from "../../../hooks/useToken";

const FormIncentiveProduct = (props) => {
    const { data } = props
    const { id } = useParams();
    const history = useHistory();
    const { token } = useToken()
    const { API_URL } = useSelector((state) => state.SUB_DEALER);

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({});

    const save = async ({ formData, id }) => {
        try {
            let res = {}
            if(!!id){
                const formDataObj = Object.fromEntries(formData)
                res = await axios.patch(`${API_URL}incentive/${id}`, {}, {
                    params: formDataObj,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            }else{
                res = await axios.post(`${API_URL}incentive`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            }
            alert('Berhasil!')
            history.push('/incentive-product')
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
                    <div className="card-header btn-import  ">
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
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Program Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                !!errors?.name
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            name="name"
                                            defaultValue={data?.name}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {errors?.name?.[0]}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            className={`form-control`}
                                            name="start_date"
                                            defaultValue={data?.start_date}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {errors?.start_date?.[0]}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            className={`form-control`}
                                            name="end_date"
                                            defaultValue={data?.end_date}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {errors?.end_date?.[0]}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <Link to="/incentive-product">
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
                                                disabled={isLoading}
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
                                                ) : props.title === "Edit Incentive Product" ? (
                                                    "Save"
                                                ) : (
                                                    "Create"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormIncentiveProduct;
