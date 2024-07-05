import React, { Component } from "react";
import FormIncentiveReference from "./FormIncentiveReference";

class AddIncentiveReference extends Component 
{
    render() {
        return (
             <div>
                 <div className="d-flex justify-content-center">
                    <div className="col-lg-10">
                        <FormIncentiveReference 
                            title= "Add Incentive Reference" 
                        />
                    </div>
                 </div>
             </div>
        );
    }
}

export default AddIncentiveReference;