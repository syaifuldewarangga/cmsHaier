import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function PrivacyPolicy(props) {
    const [privacyPoicy, setPrivacyPolicy] = useState('')
    const token = localStorage.getItem('access_token')

    const getPrivacyPolicy = async () => {
        await axios.get(props.base_url + 'privacy-policy', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setPrivacyPolicy(res.data.content)
        })
    }

    useEffect(() => {
        getPrivacyPolicy()
    }, [])

    return (
        <div className="privacy-policy">
            <h5 className="dasboard title">Privacy Policy</h5>
            <div className="mt-5">
                <div>
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-lg-end mb-3">
                            <Link to="/setting/privacy-policy/edit">
                                <button className="btn d-flex justify-content-center btn-edit">
                                    <span class="material-icons-outlined me-3"> edit </span>
                                    <span className="fw-bold">Edit About page</span>
                                </button>
                            </Link>
                        </div>
                        <div className="mt-5" dangerouslySetInnerHTML={{ __html: privacyPoicy }}></div>
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
export default connect(mapStateToProps, null) (PrivacyPolicy)
