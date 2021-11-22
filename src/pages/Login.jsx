import React, { Component } from "react";
import LoginCover from "../component/login/LoginCover";
import FormLogin from "../component/login/FormLogin";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends Component
{
    componentDidMount() {
      if(this.props.customer_login) {
        this.props.history.push('/landing-page')
      } else if(this.props.admin_login) {
        this.props.history.push('/dashboard')
      }
    }
    render() {
        return (
          <div className="row">
            <LoginCover />
            <FormLogin />
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    customer_login: state.CUSTOMER_LOGIN,
    admin_login: state.ADMIN_LOGIN
  }
}

export default withRouter(connect(mapStateToProps, null)(Login));