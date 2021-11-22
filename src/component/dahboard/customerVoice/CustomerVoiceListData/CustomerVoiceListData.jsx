import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './CustomerVoiceListData.css';

const CustomerVoiceListData = (props) => {
    const [subTitle, setSubTitle] = useState()
    useEffect(() => {
        let subTitleMessage
        if(props.data.question_type_id === 1) {
            subTitleMessage = 'You can choose more than one answer'
        } else if (props.data.question_type_id === 2) {
            subTitleMessage = 'you can only choose one answer'
        } else if(props.data.question_type_id === 3) {
            subTitleMessage = 'You can file more than one answer'
        } else if(props.data.question_type_id === 4) {
            subTitleMessage = 'You file more than one answer'
        }
        setSubTitle(subTitleMessage)
    }, [])
    
    const choiceAnswer = (data) => {
        return (
            <div class="form-check mb-3" key = {data.id}>
                <input class="form-check-input" type="radio" id="flexRadioDefault2" disabled />
                <label class="form-check-label">
                    { data.answer }
                </label>
            </div>
        )
    }

    const checkboxAnswer = (data) => {
        return(
            <div className="mt-3" key={data.id}>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled />
                    <label class="form-check-label" for="flexCheckDefault">
                        { data.answer }
                    </label>
                </div>
            </div>
        )
    }

    const linerAnswer = (data, index, length) => {
        return (
            <Fragment key={data.id}>
                {
                    index === length - 1 ? null :
                    <label className={ index === 0 ? "me-3" : null}>
                        { data.answer }
                    </label>
                }
                <input className="form-check-input me-3" type="radio" disabled/>
                {
                    index === length - 1 ? 
                    <label class="me-3">
                        { data.answer }
                    </label> : null
                }
            </Fragment>
        )
    }

    const inputAnswer = (data) => {
        return (
            <div class="mb-3" key={data.id}>
                <input type="text" class="form-control" placeholder="your answere" disabled/>
            </div>
        )
    }

    const handleAnswer = () => {
        return (
            props.data.answers.map((answer, index) => {
                if(props.data.question_type_id === 1) {
                    return (
                        checkboxAnswer(answer)
                    )
                } else if(props.data.question_type_id === 2) {
                    return (
                        choiceAnswer(answer)
                    )
                } else if(props.data.question_type_id === 3) {
                    return (
                        linerAnswer(answer, index, props.data.answers.length)
                    )
                } else if(props.data.question_type_id === 4) {
                    return (
                        inputAnswer(answer)
                    )
                }
            })
        )
    }

    return (
        <div className="customer-voice-list-data">
            <div className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <div className="header">Question</div>
                    </div>
                    <div>
                        <Link to={`/customer-voice/edit/${props.data.id}`}>
                            <button className="btn btn-sm btn-edit me-2">
                                <span class="material-icons-outlined"> edit </span>
                            </button>
                        </Link>
                        <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => props.remove(props.data.id)}
                        >
                            <span class="material-icons-outlined"> delete </span>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="question">{props.data.question}</div>
                    <div className="question-desc">({subTitle}) </div>
                    <div className="mt-3">
                        {/* tea */}
                        {handleAnswer()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerVoiceListData;