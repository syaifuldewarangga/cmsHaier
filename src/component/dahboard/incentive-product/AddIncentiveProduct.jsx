import React, { Component } from "react";
import FormIncentiveProduct from "./FormIncentiveProduct";

class AddIncentiveProdcut extends Component 
{
    render() {
        return (
             <div>
                 <div className="d-flex justify-content-center">
                    <div className="col-lg-10">
                        <FormIncentiveProduct 
                            title= "Add Incentive Product" 
                        />
                    </div>
                 </div>
             </div>
        );
    }
}

export default AddIncentiveProdcut;