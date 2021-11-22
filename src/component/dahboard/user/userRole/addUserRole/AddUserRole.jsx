import React, { Component } from "react";
import FormUserRole from "../formUserRole/FormUserRole";

class AddUserRole extends Component {
    render () {
        return (
            <div>
                <FormUserRole 
                    title="Add User Role"
                />
            </div>
        );
    }
}

export default AddUserRole;