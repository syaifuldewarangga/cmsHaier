import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const FormAbout = (props) => {
    const history = useHistory()
    const [aboutData, setAboutData] = useState('')
    const [errorData, setErrorData] = useState({
        content: ''
    })

    const token = localStorage.getItem('access_token')
    const getAboutFromAPI = async () => {
        await axios.get(props.base_url + 'about', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then((res) => {
            setAboutData(res.data.content)
        })
    }
    useEffect(() => {
        getAboutFromAPI()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()

        formData.append('content', aboutData)
        await axios.put(props.base_url + 'about', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            alert('berhasil')
            history.push('/setting/about')
        }).catch((err) => {
            // console.log(err.response)
            if(err.response.data !== undefined) {
                let responError = err.response.data;
                setErrorData({
                    ...errorData,
                    content: responError.message,
                });
            }
        })
    }

    return (
        <div className="form-about">
            <div className="card">
                <div className="card-header btn-import">
                    <h5 className="dashboard title" style={{ margin: '0', padding: '7px 0' }} >
                        About Form
                    </h5>
                </div>

                <div className="card-body">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="col-lg-12 mb-3">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={aboutData}
                                    // ariaLabel="content"
                                    onReady={(editor) => {
                                        // You can store the "editor" and use when it is needed.
                                        // console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const value = editor.getData();
                                        setAboutData(value);
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                                <div className="text-danger">{errorData.content}</div>
                            </div>

                            <div className="d-grid gap-2">
                                <button class="btn btn-import" type="submit" > Save </button>
                            </div>
                        </form>
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
export default  connect(mapStateToProps, null) (FormAbout)