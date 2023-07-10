import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { tableToCSV } from '../../../variable/TableToCSV';

const filterAndReplaceData = (initialArray, replacementArray) => {
    return [...initialArray.map((v, i) => {
        if(replacementArray.code === '200' && replacementArray.barcodeInfo !== ""){
            const replacementObject = replacementArray.barcodeInfo.find(replacement => replacement?.serialNumber === v.barcode);

            return !!replacementObject ? 
                {
                    created_DATE: null,
                    sr_NUM: v.sr_NUM,
                    barcode: replacementObject.serialNumber,
                    product_DESC_ZH: replacementObject.productModel,
                    product_CODE: replacementObject.productCode
                } : v;
        }
        return v
    })]
}

function MultipleSearch(props) {
    var token = localStorage.getItem('access_token');
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getMultipleDataFromHGWMS = async (serialNumbers) => {
        try {
           const formData = new FormData() 
           serialNumbers.map((v, i) => {
                formData.append('serialNumbers', v)
           })
           const responseHgwms = await axios.post(props.hgwms_url + 'barcodeListInfo', formData)
           return responseHgwms.data
        } catch (err) {
            // console.log(err.response)
        }
    }

    const handleBarcodeFile = async (e) => {
        setIsLoading(true)
        const csv_file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', csv_file)

        await axios.post(props.oapi_url + 'wms-order-out/s', formData, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        }).then(async (res) => {
            const notFoundDataBarcode = [...res.data?.filter((v) => v.product_CODE == null ).map(v => v.barcode)]
            const fromHgwms = await getMultipleDataFromHGWMS(notFoundDataBarcode);
            const newData = filterAndReplaceData(res.data, fromHgwms)
            setData(newData)
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
        })
    }

    const changeFile = () => {
        document.getElementById("btn-change-file").click()
    }
    const downloadProduct = () => {
        tableToCSV('table-multiple-product', 'Product')
    }
    return (
        <Fragment>
            <div className='mt-5'>
                <div>
                    <h6>Multiple Search Using CSV OR XLSX File</h6>
                </div>
                {
                    data.length === 0 && isLoading === false ? 
                    <div className="btn-upload-custom">
                        <div className="dropzone-wrapper">
                            <div className="dropzone-desc">
                            <span className="material-icons"> cloud_upload </span>
                            <p>Choose an csv file or drag it here.</p>
                            </div>
                            <input
                                type="file"
                                className="dropzone"
                                aria-label="barcode_file"
                                onChange={handleBarcodeFile}
                                accept="csv"
                            />
                        </div>
                    </div> : null
                }
                {
                    isLoading ? 
                    <div className='d-flex justify-content-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> 
                    : null
                }

                {
                    data.length !== 0 && isLoading === false ? 
                    <div className="mt-3">
                        <div className="d-grid gap-2 mb-2">
                            <button className="btn btn-outline-success" onClick={changeFile}>Change File</button>
                            <input 
                                className="d-none"
                                id="btn-change-file"
                                type="file"
                                aria-label="barcode_file"
                                onChange={handleBarcodeFile}
                                accept="csv"
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-success" 
                                type="button"
                                onClick={downloadProduct}
                            >
                                Download File
                            </button>
                        </div>
                    </div> : null
                }
            </div>

            <table className="d-none" id="table-multiple-product">
                <thead>
                    <tr>
                        <th>SR NUM</th>
                        <th>SERIAL</th>
                        <th>Model</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.sr_NUM}</td>
                                    <td>{product.barcode}</td>
                                    <td>{product.product_DESC_ZH}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        oapi_url: state.OAPI_URL,
        hgwms_url: state.HGWMS_URL
    }
}

export default connect(mapStateToProps, null)(MultipleSearch)