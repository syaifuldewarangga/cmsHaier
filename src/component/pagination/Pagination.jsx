import React, { useState } from "react";

const Pagination = (props) => {
    const [page, setPage] = useState();
    const totalPage = props.totalPage
    const currentPage = props.currentPage
    const pageNumber = []
    for (let i=1; i <= totalPage; i++) {
        pageNumber.push(i)
    }

    const handleChangePage = (e) =>{
        props.changePage(e.target.value)
    }

    const nextPage = (data) => {
        props.changePage(data + 1)
    }

    const prevPage = (data) => {
        props.changePage(data - 1)
    }

    return (
        <div>
            <div className="d-flex">
                {
                    currentPage > 1 ?
                    <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => prevPage(currentPage)}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button> : null
                }
                <div className="mx-2">
                    <select 
                        class="form-select form-select-sm"
                        onChange={handleChangePage}
                    >
                        {
                            pageNumber.map(number => (
                                <option 
                                    key={number} 
                                    value={number} 
                                    selected={number === currentPage ? 'selected' : null}
                                >
                                    {number}
                                </option>
                            ))
                        }
                    </select>
                </div>
                {
                    totalPage !== currentPage ?
                    <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => nextPage(currentPage)}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button> : null
                }
            </div>
        </div>
    )
}

export default Pagination