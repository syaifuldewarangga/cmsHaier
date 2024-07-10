import axios from 'axios';
import React, { Fragment, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import useToken from '../../../hooks/useToken';

const dataMonth = [
    { month: 'Januari', value: 1 },
    { month: 'Februari', value: 2 },
    { month: 'Maret', value: 3 },
    { month: 'April', value: 4 },
    { month: 'Mei', value: 5 },
    { month: 'Juni', value: 6 },
    { month: 'Juli', value: 7 },
    { month: 'Agustus', value: 8 },
    { month: 'September', value: 9 },
    { month: 'Oktober', value: 10 },
    { month: 'November', value: 11 },
    { month: 'Desember', value: 12 },
];

const getYearList = () => {
    const currentYear = new Date().getFullYear();
    const yearsBefore = [currentYear - 3, currentYear - 2, currentYear - 1];
    const yearsNext = [currentYear + 1, currentYear + 2]
    const yearList = [...yearsBefore, currentYear, ...yearsNext];

    return yearList;
};

export const getMonthNameByValue = (value) => dataMonth.find(v => v.value === value)?.month || '-'

const FormIncentiveReference = (props) => {
    const { data } = props
    const { id } = useParams();
    const history = useHistory();
    const { token } = useToken();

    const { API_URL } = useSelector((state) => state.SUB_DEALER);

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({})
   
    const save = async ({ formData, id }) => {
        try {
            let res = {}
            if(!!id){
                const formDataObj = Object.fromEntries(formData)
                res = await axios.patch(`${API_URL}monthly-incentives/${id}`, {}, {
                    params: formDataObj,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            }else{
                res = await axios.post(`${API_URL}monthly-incentives`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            }
            alert('Berhasil!')
            history.push('/incentive-reference')
        } catch (error) {
            setErrors(error?.response?.data?.errors)
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        setIsLoading(true)
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
                            <div className="row mb-4">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Year
                                        </label>
                                        <select name="year" defaultValue={data?.year} className="form-control">
                                            <option selected disabled>Select Year</option>
                                            {getYearList().map((v, i) => {
                                                return (
                                                    <option key={v} value={v}>{v}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="text-danger">
                                            {errors?.year?.[0]}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Month
                                        </label>
                                        <select name="month" defaultValue={data?.month} className="form-control">
                                            <option selected disabled>Select Month</option>
                                            {dataMonth.map((v, i) => {
                                                return (
                                                    <option key={v.value} value={v.value}>{v.month}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="text-danger">
                                            {errors?.month?.[0]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <Link to={`/incentive-reference`}>
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
                                        ) : data?.record?.length === 0 ? (
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

export default FormIncentiveReference;