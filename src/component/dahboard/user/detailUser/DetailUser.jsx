import React, { Component } from "react";
import FormUser from "../fromUser/FormUser";

class DetailUser extends Component 
{
    render() {
        return (
             <div>
                 <div className="d-flex justify-content-center">
                    <div className="col-lg-7">
                        <FormUser 
                            title= "Detail User" 
                        />
                    </div>
                 </div>
             </div>
        );
    }
}

export default DetailUser;