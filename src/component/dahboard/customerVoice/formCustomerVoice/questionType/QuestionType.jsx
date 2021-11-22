import React, { useEffect, useState } from "react";
import './QuestionType.css';

const QuestionType = (props) => {
    const [questionType, setQuestionType] = useState()

    useEffect(() => {
        switch (props.questionTypeIdData) {
            case 1:
                setQuestionType('checklist')
                break;
            case 2:
                setQuestionType('choice')
                break;
            case 3:
                setQuestionType('linear')
                break;
            case 4:
                setQuestionType('inputText')
                break;
            default:
                setQuestionType('')
                break;
        }
    }, [props.questionTypeIdData])

    const handleQuestion = (value) => {
        setQuestionType(value)

        let question_type_id
        if(value === 'checklist') {
            question_type_id = 1
        } else if(value === 'choice') {
            question_type_id = 2
        } else if(value === 'linear') {
            question_type_id = 3
        } else {
            question_type_id = 4
        }
        props.addQuestionType(question_type_id)
    }

    return (
        <div className="col-lg-7 question-type">
            <div className="row">
                <div 
                    className={`col-lg-3 ${questionType === 'choice' ? 'active' : '' }`} 
                    onClick={() => handleQuestion('choice')}
                >
                    <div className="d-flex justify-content-center align-items-center question-type" style={{ background: "#851EEC" }}>
                        <div class="text-center px-2">
                            <span class="material-icons-outlined md-36"> radio_button_checked </span>
                            <p>Choice </p>
                        </div>
                    </div>
                </div>

                <div 
                    className={`col-lg-3 ${questionType === 'checklist' ? 'active' : '' }`} 
                    onClick={() => handleQuestion('checklist')}
                >
                    <div className="d-flex justify-content-center align-items-center question-type" style={{ background: "#1E58EC" }}>
                        <div class="text-center px-2">
                            <span class="material-icons md-36"> check_box </span>
                            <p>Checklist</p>
                        </div>
                    </div>
                </div>

                <div 
                    className={`col-lg-3 ${questionType === 'linear' ? 'active' : '' }`} 
                    onClick={() => handleQuestion('linear')}
                >
                    <div className="d-flex justify-content-center align-items-center question-type" style={{ background: "#1EC7EC" }}>
                        <div class="text-center px-2">
                            <span class="material-icons md-36"> linear_scale </span>
                            <p>Linear</p>
                        </div>
                    </div>
                </div>

                <div 
                    className={`col-lg-3 ${questionType === 'inputText' ? 'active' : '' }`} 
                    onClick={() => handleQuestion('inputText')}
                >
                    <div className="d-flex justify-content-center align-items-center question-type" style={{ background: "#DB9836" }}>
                        <div class="text-center px-2">
                            <span class="material-icons md-36"> crop_16_9 </span>
                            <p>Input Text</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionType;