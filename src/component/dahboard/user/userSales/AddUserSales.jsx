import React, { Component } from "react";
import FormUserSales from "./FormUserSales";

class AddUserSales extends Component 
{
    render() {
        return (
             <div>
                 <div className="d-flex justify-content-center">
                    <div className="col-lg-10">
                        <FormUserSales 
                            title= "Add User Sales" 
                        />
                    </div>
                 </div>
             </div>
        );
    }
}

export default AddUserSales;