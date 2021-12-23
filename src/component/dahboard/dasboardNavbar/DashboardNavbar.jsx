import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import './DashboardNavbar.css'
import { connect } from "react-redux";
import { image_url } from "../../../variable/GlobalVariable";

class DashboardNavbar extends Component {
    componentDidMount() {
        DashboardNavbarNavigation();
    }

    CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Link href="#" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }} >
            {children}
        </Link>
    ));

    handleLogout = () => {
        localStorage.removeItem('access_token')    
        localStorage.removeItem('email')
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="dashboard-navbar">
                <nav className="navbar fixed-top navbar-light bg-white">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">    
                            <span class="material-icons-outlined menu"> menu </span>
                            <img src={`${image_url}logo.png`} alt="logo aqua japan" width="75px"/>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle as={this.CustomToggle} id="dropdown-custom-components">
                                    <span class="profile-name me-2">{localStorage.getItem('fullname')}</span>
                                    <img 
                                        src={this.props.user.photo !== '' ? this.props.image_url +""+ this.props.user.photo : '/assets/images/user.png'}
                                        alt="profile" 
                                        width="25px"
                                        className="rounded-circle"
                                    />
                                    <i class='bx bx-chevron-down' ></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link to="/admin-profile">
                                        <img 
                                            src={this.props.user.photo !== '' ? this.props.image_url +""+ this.props.user.photo : image_url + 'user.png'}
                                            alt="profile" 
                                            width="25px"
                                            className="rounded-circle"
                                        />
                                        <span class="profile-name ms-2">{localStorage.getItem('fullname')}</span>
                                    </Link>
                                </Dropdown.Item>

                                <hr class="dropdown-divider" />

                                    <Dropdown.Item>
                                        <Link to="/change-password-admin">
                                            <i class='bx bx-lock'></i>
                                            <span class="text">Change Password</span>
                                        </Link>
                                    </Dropdown.Item>
                                

                                <Dropdown.Item 
                                    onClick={this.handleLogout}
                                >
                                    <i class='bx bx-log-out'></i>
                                    <span class="text" > Logout </span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </nav>
            </div>
        );
    }
}

const DashboardNavbarNavigation = () => {
    let sidebar = document.querySelector('.sidebar');
    let sidebarBtn = document.querySelector('.menu');
    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    })
}

const mapStateToProps = (state) => {
    return {
        user: state.USER,
        image_url: state.URL
    }
}
export default withRouter(connect(mapStateToProps, null) (DashboardNavbar));