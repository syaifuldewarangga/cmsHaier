import React, { Fragment, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import DashboardNavbar from '../dahboard/dasboardNavbar/DashboardNavbar'
import Sidebar from '../dahboard/sidebar/Sidebar'
import axios from 'axios'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const adminLogin = rest.admin_login

    const cekUserData = async () => {
        const token = localStorage.getItem('access_token')
        const email = localStorage.getItem('email')
        if(token !== null && email) {
            await axios.get(rest.base_url + 'user/get', {
                headers: {
                    Authorization: 'Bearer ' + token
                },
                params: {
                    identifier: email + 'A'
                }
            }).then((res) => {
                rest.changeAdminLogin(true)
                rest.changeUser(res.data)
                var permissions = [];
                res.data.permissions.map((item) => {
                    permissions.push(item.permission_name)
                })
                rest.changeUserPermission(permissions)                
            }).catch((err) => {
                localStorage.clear();
                rest.changeAdminLogin(false)
                console.log(err.response)
            })
        } 
    }

    useEffect(() => {
        cekUserData()
    }, [])

    
    return (
    <Fragment>
        <DashboardNavbar />
        <Sidebar />
        <section className="home-section">
            <div className="main-content">
                <div className="container-fluid">
                    <div className="mx-3">
                        <Route
                            {...rest}
                            render={ props =>
                                adminLogin ? (
                                    <Component {...props} />
                                ) : (
                                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    </Fragment>
)
}
const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL,
        admin_login: state.ADMIN_LOGIN
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeAdminLogin: (value) => dispatch({ type: 'CHANGE_ADMIN_LOGIN', value: value}),
        changeUser: (value) => dispatch({
            type: 'CHANGE_USER',
            value: {
                fullname: value.first_name + value.last_name,
                phone_number: value.phone,
                username: value.username,
                photo: value.image.length !== 0 ? value.image[0].path : '',
            }
        }),
        changeUserPermission: (value) => dispatch({ type: 'CHANGE_USER_PERMISSION', value: value})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (PrivateRoute)