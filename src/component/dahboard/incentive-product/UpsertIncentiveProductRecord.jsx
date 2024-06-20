import axios from 'axios';
import { Modal } from 'bootstrap';
import produce from 'immer';
import React, { Fragment, useEffect, useState } from "react";
import Autocomplete from 'react-autocomplete';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import readXlsxFile from 'read-excel-file';
import useToken from '../../../hooks/useToken';
import ModalConfirm from './ModalConfirm';

const Form = (props) => {
    const { data } = props
    const { id } = useParams();
    const history = useHistory();
    const token = useToken();

    const base_url = useSelector((state) => state.BASE_URL);
    const { API_URL } = useSelector((state) => state.SUB_DEALER);

    const [isLoading, setIsLoading] = useState(false);
    const [productModels, setProductModels] = useState([
        { product_model: "", incentive: "" },
    ]);
    const [options, setOptions] = useState([]);
    const [errors, setErrors] = useState({})
    
    const [loadingPage, setLoadingPage] = useState(true)
    const getOptions = async () => {
        const res = await axios.get(`${base_url}extended-warranty-promo/wms?product_model=`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                        "Content-Type": "application/json",
                },
            }
        );
        setOptions([...res.data]);
    };

    const handleDownloadTemplate = () => {
        const filePath = process.env.PUBLIC_URL + "/templates/template_import_incentive_sub_dealer.xlsx";
        const link = document.createElement("a");
        link.href = filePath;
        link.download = "template_import_incentive_sub_dealer.xlsx"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const importExcel = async (e) => {
        const data = await readXlsxFile(e.target.files[0]);
        const temp = data.map((v) => { 
            return {
                product_model: v[0],
                incentive: v[1],
            };
        }).slice(1, data.length);
        setProductModels([...productModels, ...temp]);

        e.target.value = "";
    };

    const checkProductModel = () => {
        const cek = productModels.map((v) => {
            return options.includes(v.product_model);
        });
        return cek.every((elem, index, arr) => elem == true);
    };

    const hideModal = () => {
        let alertModal = Modal.getInstance(
            document.getElementById("modalConfirm")
        );
        if (alertModal !== null) alertModal.hide();
    };

    const handleModal = () => {
        let alertModal = new Modal(document.getElementById("modalConfirm"));
        alertModal.show();
    };

    const save = async ({ body }) => {
        const modalExist = document.getElementById("modalConfirm");
        try {
            let res = {}
            res = await axios.post(`${API_URL}incentive/${id}/upsert-record`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            alert('Berhasil!')
            history.push(`/incentive-product/detail/${id}`)
        } catch (error) {
            setErrors(error?.response?.data?.errors)
        } finally {
            setIsLoading(false)
            if (!!modalExist) {
                hideModal();
            }
        }
    }

    const fetchAPI = () => {
        setIsLoading(true);
        let temp = []
        productModels.map((v) => {
            temp.push({
                product_model: v.product_model,
                incentive: v.incentive,
            })
        });
        const body = {
            incentive_id: id,
            record: [...temp] 
        }
        save({ body })
        
    };

    const onSubmit = () => {
        const cek = checkProductModel();
        if (cek) {
            fetchAPI();
        } else {
            handleModal();
        }
    };

    useEffect(() => {
        if (!!data) {
            if(data?.record?.length > 0){
                setProductModels([...data?.record?.filter(v => {
                    return {
                        product_model: v.product_model,
                        incentive: v.incentive
                    }
                })])
            }
        }
    }, [id]);

    useEffect(() => {
        let mounted = true;
        if (mounted && options.length == 0) {
            getOptions().then(v => setLoadingPage(false));
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
                    {!loadingPage ?
                        <div className="card-body"> 
                            <div className="row">
                                
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
                                            <label
                                                className="btn btn-outline-success"
                                                onClick={handleDownloadTemplate}
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
                                    productModels.map((productModel, index) => {
                                        const error_product_model = errors?.[`record.${index}.product_model`]?.[0] || undefined
                                        const error_incentive = errors?.[`record.${index}.incentive`]?.[0] || undefined
                                        const isValid = !!options.find(
                                            (v) => productModel.product_model
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
                                                                        v.includes(productModel?.product_model?.toUpperCase())
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
                                                                                ${!!error_product_model ? "is-invalid" : null}
                                                                                ${isValid ? "is-valid" : null}
                                                                                ${!options.includes( productModel.product_model) && productModel.product_model != "" ? "is-invalid" : null } 
                                                                            `}
                                                                                {...props}
                                                                            />
                                                                        </div>
                                                                    );
                                                                }}
                                                                // open={options.filter(v => v.includes(productModel?.value?.toUpperCase())).length > 0 ? true : false}
                                                                value={productModel.product_model}
                                                                onChange={(e) => {
                                                                    const productModel = e.target .value;
                                                                    setProductModels((currentproductModels) => produce(currentproductModels, ( v) => {
                                                                                    v[index] = {
                                                                                        ...v[index],
                                                                                        product_model: productModel,
                                                                                        status: "",
                                                                                    };
                                                                                }
                                                                            )
                                                                    );
                                                                }}
                                                                onSelect={(val) => {
                                                                    const productModel = val;
                                                                    setProductModels(( currentproductModels) => produce(currentproductModels, (v) => {
                                                                                    v[index] = {
                                                                                        ...v[index], 
                                                                                        product_model: productModel,
                                                                                        status: "valid",
                                                                                    };
                                                                                }
                                                                            )
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        {!!error_product_model && (
                                                            <div className="invalid-feedback d-block">
                                                                {error_product_model?.replaceAll(index, ' ').replaceAll('.', ' ')}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                            Incentive
                                                        </label>
                                                        <div className="d-flex w-100">
                                                            <input
                                                                type="number"
                                                                className={`
                                                                    form-control
                                                                    ${!!error_incentive ? 'is-invalid' : null}
                                                                `}
                                                                aria-label="name"
                                                                onChange={(e) => {
                                                                    const incentive = e.target .value;
                                                                    setProductModels(( currentproductModels) => produce(currentproductModels, (v) => {
                                                                                    v[index] = {
                                                                                        ...v[index],
                                                                                        incentive: incentive,
                                                                                    };
                                                                                }
                                                                            )
                                                                    );
                                                                }}
                                                                value={productModel.incentive}
                                                                required
                                                            />
                                                            {productModels.length > 1 ? (
                                                                <button
                                                                    className="btn btn-sm btn-danger ms-3"
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setProductModels(( currentproductModels) => currentproductModels.filter((productModel, x) => x !== index));
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
                                                        {!!error_incentive && (
                                                            <div className="invalid-feedback d-block">
                                                                {error_incentive?.replaceAll(index, ' ').replaceAll('.', ' ')}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Fragment>
                                        );
                                    })
                                }
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="d-flex flex-lg-row">
                                            <div className="px-1">
                                                <button
                                                    className="btn btn-add"
                                                    type="button"
                                                    onClick={() => {
                                                        setProductModels(
                                                            (currentproductModels) => [
                                                                ...currentproductModels,
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
                                                        setProductModels([
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

                            <div className="row">
                                <div className="col-6">
                                    <Link to={`/incentive-product/detail/${id}`}>
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
                                        ) : data?.record?.length === 0 ? (
                                            "Save"
                                        ) : (
                                            "Create"
                                        )}
                                    </button>
                                </div>
                            </div>

                            <ModalConfirm
                                isLoading={isLoading}
                                buttonTittle='Save'
                                remove={fetchAPI}
                                message={
                                    "There's Product Model That Not Registered, Are you Sure ?"
                                }
                            />
                        </div>
                    :
                        <div className='card-body'>
                            <div className="d-flex justify-content-center">
                                <span
                                    class="spinner-border me-1  "
                                    role="status"
                                    aria-hidden="true"
                                ></span> 
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

const UpsertIncentiveProductRecord = (props) => {
    const { id } = useParams();
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true)

    const { API_URL } = useSelector((state) => state.SUB_DEALER);
    const token = useToken()

    React.useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${API_URL}incentive/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                setData(res.data.data);
                
            } finally {
                setLoading(false)
            }
        }
        if(!!token){
            fetchData();
        }
    }, [id, token]);

    if(loading){
        return <div>Loading...</div>
    }
    if(!loading && !data){
        return <div>Incentive Not Found!</div>
    }
    return (
        <div>
            <div className="d-flex justify-content-center">
               <div className="col-lg-10">
                   <Form 
                       title= "Edit Incentive Product"
                       data={data} 
                   />
               </div>
            </div>
        </div>
    );
};



export default UpsertIncentiveProductRecord;