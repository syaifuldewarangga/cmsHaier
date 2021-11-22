import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './NotFound.css'
const NotFound = () =>  {

    useEffect(() => {
        document.body.style = 'background: #f5f5f5;';
    }, [])
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div class="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div class="error-actions">
                            <Link to="/">
                                <button className="btn btn-outline-primary">
                                    BACK TO HOME
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound