import React, { Component, PureComponent } from 'react'
import FormCustomerVoice from '../formCustomerVoice/FormCustomerVoice';
 
class AddCustomerVoice extends Component {
    render() {
        return (
            <FormCustomerVoice 
                title="Add Question"
            />
        );
    }
}

export default AddCustomerVoice;