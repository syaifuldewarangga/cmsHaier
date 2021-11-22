import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import DashboardNavbar from '../dahboard/dasboardNavbar/DashboardNavbar'
import Sidebar from '../dahboard/sidebar/Sidebar'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const adminLogin = rest.admin_login

    return (
    <Fragment>
        <DashboardNavbar />
        <Sidebar />
        <section class="home-section">
            <div class="main-content">
                <div class="container-fluid">
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
        admin_login: state.ADMIN_LOGIN
    }
}
export default connect(mapStateToProps, null) (PrivateRoute)