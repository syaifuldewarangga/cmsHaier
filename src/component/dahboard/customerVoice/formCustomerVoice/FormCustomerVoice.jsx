import React, { useEffect, useRef, useState } from "react";
import { produce } from "immer";
import './FormCustomerVoice.css';
import QuestionType from "./questionType/QuestionType";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const FormCustomerVoice = (props) => {
    const history = useHistory()
    const questionRef = useRef()
    const [errorData, setErrorData] = useState({
        question_type_id: '',
        question: ''
    })
    const [answers, setAnswers] = useState([''])
    const [formQuestion, setFormQuestion] = useState({
        user_id: localStorage.getItem('id'),
        question_type_id: '',
        question: '',
    })

    useEffect(() => {
        if(props.title === 'Edit Question') {
            setDataQuestion()
        }
    }, [props.data])

    const setDataQuestion = () => {
        setFormQuestion({
            ...formQuestion,
            'question_type_id': props.data.question_type_id,
            'question': props.data.question
        })

        if(Object.keys(props.data).length !== 0) {
            const newAnswer = [];
            props.data.answers.map((answer) => {
                newAnswer.push(answer.answer)
            })
             setAnswers(newAnswer)
        }
    }

    const handleQuestionType = (questionType) => {
        setFormQuestion({
            ...formQuestion,
            'question_type_id': questionType,
        })
    }

    const handleFormQuestion = (event) => {
        setFormQuestion({
            ...formQuestion,
            [event.target.ariaLabel]: event.target.value,
        })
    }

    const errorMessage = (responError) => {
        if(responError.location === 'question_type_id') {
            setErrorData({
                ...errorData,
                question_type_id: responError.reason
            })
        }

        if(responError.location === 'question') {
            setErrorData({
                ...errorData,
                question: responError.reason
            })
            questionRef.current.focus()
        }
    }

    const createDataToAPI = (data) => {
        const token = localStorage.getItem('access_token')
        axios.post(props.base_url + 'customer-voice-questions', data, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then(() => {
            alert('Berhasil')
            history.push('/customer-voice/list');
        }).catch((err) => {
            let responError = err.response.data.errors
            errorMessage(responError)
        })
    }

    const updateDataToAPI = (data) => {
        const token = localStorage.getItem('access_token')
        console.log(Object.fromEntries(data))
        axios.put(props.base_url + 'customer-voice-questions', data, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            alert('Berhasil')
            history.push('/customer-voice/list');
        }).catch((err) => {
            let responError = err.response.data.errors
            console.log(err.response.data.error_message)
            // errorMessage(responError)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('question_type_id', formQuestion.question_type_id)
        formData.append('question', formQuestion.question)
        

        if(props.title === 'Edit Question') {
            formData.append('id', props.data.id)
            answers.map((answer) => {
                formData.append('answers', answer)
            })
            updateDataToAPI(formData)
        } else {
            answers.map((answer) => {
                formData.append('answer', answer)
            })
            formData.append('user_id', formQuestion.user_id)
            console.log(answers)
            // createDataToAPI(formData)
        }
    }
    
    return (
        <div className="form-customer-voice">
            <div className="col-lg-7 mx-auto">
                <div className="card">
                    <div className="card-header btn-import  ">
                        <h5 className="dashboard title" style={{ margin: "0", padding: "7px 0" }}>{ props.title }</h5>
                    </div>

                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-5">
                                        <div className="d-lg-flex justify-content-center">
                                            <QuestionType 
                                                addQuestionType={handleQuestionType}
                                                questionTypeIdData = {formQuestion.question_type_id}
                                            />
                                        </div>
                                        <div className="text-danger">
                                            { errorData.question_type_id }
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Input your question</label>
                                        <textarea 
                                            class={`form-control ${errorData.question !== '' ? 'is-invalid' : null }`} 
                                            id="exampleFormControlTextarea1" 
                                            rows="3"
                                            aria-label="question"
                                            ref={questionRef}
                                            value={formQuestion.question}
                                            onChange={handleFormQuestion}
                                        >    
                                        </textarea>
                                        <div className="invalid-feedback">
                                            { errorData.question }
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <p className="fw-bold">Answer</p>
                                        {answers.map((answer, index) => {
                                            return (
                                                <div class="mb-3" key={index}>
                                                    <div className="d-flex">    
                                                        <input 
                                                            class="form-control" 
                                                            type="text"  
                                                            onChange={e => {
                                                                const answer = e.target.value;
                                                                setAnswers(currentAnswers => 
                                                                    produce(currentAnswers, v => {
                                                                        v[index] = answer
                                                                    })
                                                                );
                                                            }}
                                                            value={answer}
                                                        />
                                                        { answers.length > 1 ?
                                                        <button 
                                                            className="btn btn-danger ms-3" 
                                                            type="button"
                                                            onClick={() => {
                                                                setAnswers(currentAnswers => currentAnswers.filter((answer, x) => x !== index))
                                                            }}
                                                        > 
                                                            <span class="material-icons"> delete </span>
                                                        </button>
                                                        : ""}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div>
                                            <button 
                                                className="btn btn-add" 
                                                type="button"
                                                onClick={() => {
                                                    setAnswers(currentAnswers => [
                                                        ...currentAnswers, ""
                                                    ])
                                                }}
                                            >
                                                Add Answer
                                            </button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <Link to="/customer-voice/list">
                                                <div className="d-grid gap-2">
                                                    <button class="btn btn-outline-import" type="button">Cancel</button>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="d-grid gap-2 col-6">
                                            <button class="btn btn-import" type="submit">
                                                {
                                                    props.title === 'Edit Question' ? 'Save' : 'Create'
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
}
export default connect(mapStateToProps, null) (FormCustomerVoice);