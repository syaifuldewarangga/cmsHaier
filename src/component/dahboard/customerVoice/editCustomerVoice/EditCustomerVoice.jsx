import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import FormCustomerVoice from "../formCustomerVoice/FormCustomerVoice";


const EditCustomerVoice = (props) => {
    let { id } = useParams()
    let token = localStorage.getItem('access_token')
    const [data, setData] = useState({})

    const getQuestionFromAPI = async () => {
        await axios.get(props.base_url + 'customer-voice-questions/get', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                id: id
            }
        }).then((res) => {
            setData(res.data)
        })
    }

    useEffect(() => {
        getQuestionFromAPI()
    }, [])

    return (
        <div>
            <FormCustomerVoice 
                title="Edit Question"
                data = {data}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
}
export default connect(mapStateToProps, null) (EditCustomerVoice)