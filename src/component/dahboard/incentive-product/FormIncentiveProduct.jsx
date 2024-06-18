import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { produce } from "immer";
import readXlsxFile from "read-excel-file";
import Autocomplete from "react-autocomplete";
import ModalConfirm from "./ModalConfirm";
import { Modal } from "bootstrap";
const regexCheck = (string) => {
    return /^[a-zA-Z0-9]+$/.test(string);
};
const FormIncentiveProduct = (props) => {
    const { id } = useParams();
    const history = useHistory();

    const [errorsData, setErrorsData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [answers, setAnswers] = useState([
        { product_model: "", incentive: "" },
    ]);
    const [options, setOptions] = useState([]);
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        start_date: '',
        end_date: ''
    })
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    
    const getOptions = async () => {
        const res = await axios.get(`${props.base_url}extended-warranty-promo/wms?product_model=`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                },
            }
        );
        setOptions([...res.data]);
    };

    const importExcel = async (e) => {
        const data = await readXlsxFile(e.target.files[0]);
        const temp = data
            .map((v) => {
                return {
                    value: v[0],
                    status: "",
                };
            })
            .slice(1, data.length);
        setAnswers([...answers, ...temp]);

        e.target.value = "";
    };

    const checkProductModel = () => {
        const cek = answers.map((v) => {
            return options.includes(v.value);
        });
        return cek.every((elem, index, arr) => elem == true);
    };

    const hideModal = () => {
        let alertModal = Modal.getInstance(
            document.getElementById("modalConfirm")
        );
        // console.log(alertModal)
        if (alertModal !== null) alertModal.hide();
    };

    const handleModal = () => {
        let alertModal = new Modal(document.getElementById("modalConfirm"));
        alertModal.show();
    };

    const fetchAPI = () => {
        setIsLoading(true);
        const formData = new FormData();
        // console.log(answers)
        answers.map((v) => {
            formData.append("product_model", v.value);
        });

        var token = localStorage.getItem("access_token");
        const modalExist = document.getElementById("modalConfirm");
        if (props.title === "Edit Incentive Product") {
            //Update
            formData.append("id", id);
            axios
                .post(
                    props.base_url + "extended-warranty-promo/edit",
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    alert("berhasil edit incentive product");
                    history.push("/incentive-product");
                })
                .catch((e) => {
                    let responError = e.response.data.errors?.location;
                    if (typeof responError !== "undefined") {
                        // console.log(e.response)
                        setErrorsData(responError);
                        if (typeof responError?.thumbnail !== "undefined") {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }
                    }
                })
                .finally(() => {
                    setIsLoading(false);

                    //close modal
                    if (
                        typeof modalExist !== null &&
                        modalExist !== "undefined"
                    ) {
                        hideModal();
                    }
                });
        } else {
            //Insert
            // console.table(Object.fromEntries(formData))
            // setIsLoading(false)
            axios
                .post(props.base_url + "extended-warranty-promo", formData, {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    alert("berhasil add incentive product");

                    history.push("/incentive-product");
                })
                .catch((e) => {
                    let responError = "";
                    // console.log(e.response)
                    if (typeof e.response.data.errors !== "undefined")
                        responError = e.response.data.errors.location;
                    // console.log(responError)
                    setErrorsData(responError);
                    if (typeof responError?.thumbnail !== "undefined") {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }
                })
                .finally(() => {
                    setIsLoading(false);

                    //close modal
                    if (
                        typeof modalExist !== null &&
                        modalExist !== "undefined"
                    ) {
                        hideModal();
                    }
                });
        }
    };
    const onSubmit = () => {
        const cek = checkProductModel();
        // console.log(document.getElementById('modalConfirm'))
        if (cek) {
            fetchAPI();
        } else {
            handleModal();
        }
    };

    useEffect(() => {
        // console.log(props.data)
        if (props.data) {
            
        }
    }, [id]);

    useEffect(() => {
        let mounted = true;
        if (mounted && options.length == 0) {
            getOptions();
        }

        return () => (mounted = false);
    }, [options.length]);

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
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className={`form-control`}
                                        name="start_date"
                                        onChange={onChange}
                                        value={form.start_date}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {!!errors?.start_date}
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
                                        onChange={onChange}
                                        value={form.end_date}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {!!errors?.end_date}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            {/* Import */}
                            <div className="col-lg-12">
                                <div className="d-flex mb-3 gap-2">
                                    <div>
                                        <input
                                            name={`product_model_import`}
                                            id={`product_model_import`}
                                            type="file"
                                            onChange={importExcel}
                                            style={{ display: "none" }}
                                        />
                                        <label
                                            htmlFor="product_model_import"
                                            className="btn btn-add"
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="material-icons-outlined me-3">
                                                    {" "}
                                                    file_upload{" "}
                                                </span>
                                                <span className="fw-bold">
                                                    Import
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            name={`product_model_import`}
                                            id={`product_model_import`}
                                            type="file"
                                            onChange={importExcel}
                                            style={{ display: "none" }}
                                        />
                                        <label
                                            htmlFor="product_model_import"
                                            className="btn btn-outline-success"
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="material-icons-outlined me-3">
                                                    {" "}
                                                    file_download{" "}
                                                </span>
                                                <span className="fw-bold">
                                                    Template
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Row */}
                            {options.length > 0 &&
                                answers.map((answer, index) => {
                                    const isValid = !!options.find(
                                        (v) => answer.product_model
                                    );

                                    return (
                                        <Fragment key={index}>
                                            <div className="col-lg-6">
                                                <div class="mb-3">
                                                    <label className="form-label">
                                                        Product Model
                                                    </label>
                                                    <div className="d-flex w-100">
                                                        <Autocomplete
                                                            wrapperStyle={{ width: "100%", }}
                                                            getItemValue={( item) => item}
                                                            items={options.filter(
                                                                (v) =>
                                                                    v.includes(answer?.product_model?.toUpperCase())
                                                            )}
                                                            renderMenu={( items, value, style) => {
                                                                return (
                                                                    <div
                                                                        style={{ 
                                                                            position: "absolute", 
                                                                            borderRadius: "3px", 
                                                                            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                                                                            background: "rgba(255, 255, 255, 0.9)",
                                                                            padding: "2px 0",
                                                                            fontSize: "90%",
                                                                            overflow: "auto",
                                                                            marginTop: "5px",
                                                                            maxHeight: "50%", // TODO: don't cheat, let it flow to the bottom
                                                                        }}
                                                                        children={items}
                                                                    />
                                                                );
                                                            }}
                                                            renderItem={( item, isHighlighted) => (
                                                                <div
                                                                    style={{
                                                                        background: isHighlighted ? "lightgray" : "white",
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    {item}
                                                                </div>
                                                            )}
                                                            renderInput={(props) => {
                                                                return (
                                                                    <div className="w-100">
                                                                        <input
                                                                            style={{
                                                                                width: "100%",
                                                                            }}
                                                                            className={`
                                                                              form-control 
                                                                              ${typeof errorsData?.product_model !== "undefined" ? "is-invalid" : null }
                                                                              ${isValid ? "is-valid" : null}
                                                                              ${ !options.includes( answer.product_model) && answer.product_model != "" ? "is-invalid" : null } 
                                                                          `}
                                                                            {...props}
                                                                        />
                                                                    </div>
                                                                );
                                                            }}
                                                            // open={options.filter(v => v.includes(answer?.value?.toUpperCase())).length > 0 ? true : false}
                                                            value={answer.product_model}
                                                            onChange={(e) => {
                                                                const answer = e.target .value;
                                                                setAnswers(( currentAnswers) => produce(currentAnswers, ( v) => {
                                                                                v[index] = {
                                                                                    ...v[index],
                                                                                    product_model: answer,
                                                                                    status: "",
                                                                                };
                                                                            }
                                                                        )
                                                                );
                                                            }}
                                                            onSelect={(val) => {
                                                                const answer = val;
                                                                setAnswers(( currentAnswers) => produce(currentAnswers, (v) => {
                                                                                v[index] = {
                                                                                    ...v[index], 
                                                                                    product_model: answer,
                                                                                    status: "valid",
                                                                                };
                                                                            }
                                                                        )
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                    {typeof errorsData?.product_model !== "undefined" && (
                                                      <div className="invalid-feedback d-block">
                                                            {errorsData.product_model}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Value
                                                    </label>
                                                    <div className="d-flex w-100">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                typeof errorsData?.name !== "undefined" ? "is-invalid" : null
                                                            }`}
                                                            aria-label="name"
                                                            onChange={(e) => {
                                                                const answer = e.target .value;
                                                                setAnswers(( currentAnswers) => produce(currentAnswers, (v) => {
                                                                                v[index] = {
                                                                                    ...v[index],
                                                                                    incentive: answer,
                                                                                };
                                                                            }
                                                                        )
                                                                );
                                                            }}
                                                            value={answer.incentive}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errorsData.name}
                                                        </div>

                                                        {answers.length > 1 ? (
                                                            <button
                                                                className="btn btn-sm btn-danger ms-3"
                                                                type="button"
                                                                onClick={() => {
                                                                    setAnswers(( currentAnswers) => currentAnswers.filter((answer, x) => x !== index));
                                                                }}
                                                            >
                                                                <span class="material-icons">
                                                                    {" "}
                                                                    delete{" "}
                                                                </span>
                                                            </button>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    );
                                })}
                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <div className="d-flex flex-lg-row">
                                        <div className="px-1">
                                            <button
                                                className="btn btn-add"
                                                type="button"
                                                onClick={() => {
                                                    setAnswers(
                                                        (currentAnswers) => [
                                                            ...currentAnswers,
                                                            {
                                                                product_model: "",
                                                                incentive: "",
                                                            },
                                                        ]
                                                    );
                                                }}
                                            >
                                                Add Row
                                            </button>
                                        </div>
                                        <div className="ms-2">
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => {
                                                    setAnswers([
                                                        {
                                                            product_model: "",
                                                            incentive: "",
                                                        },
                                                    ]);
                                                }}
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add & Clear Row */}
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
                                    type="button"
                                    disabled={isLoading && "disabled"}
                                    onClick={onSubmit}
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

                        <ModalConfirm
                            fetchAPI={fetchAPI}
                            message={
                                "There's Product Model That Not Registered, Are you Sure ?"
                            }
                        />
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

export default connect(mapStateToProps, null)(FormIncentiveProduct);
