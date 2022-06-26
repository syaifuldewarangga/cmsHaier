import React, { Component } from "react";
import FormPromo from "./FormPromo";

class AddPromo extends Component 
{
    render() {
        return (
             <div>
                 <div className="d-flex justify-content-center">
                    <div className="col-lg-7">
                        <FormPromo 
                            title= "Add Promo" 
                        />
                    </div>
                 </div>
             </div>
        );
    }
}

export default AddPromo;