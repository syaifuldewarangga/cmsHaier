import React, { Component } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { permissionCek } from "../../../action/permissionCek";
import './Sidebar.css'

const Sidebar = (props) => {
    useEffect(() => {
        SidebarNavigation();
    }, [])
    return (
        <div className="dasboard-sidebar sidebar">
            <ul className="nav-links">
                <li>
                    <Link to="/dashboard">
                        <i className="material-icons-outlined"> dashboard </i>
                        <span className="link-name">Dashboard</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link-name" to="#">Dashboard</Link></li>
                    </ul>
                </li>

                <li>
                    <div className="icon-link drop-down-menu">
                        <i className="material-icons-outlined"> library_books </i>
                        <span className="link-name">Master Data</span>
                        <i className="material-icons-outlined arrow"> expand_more </i>
                    </div>
                    <ul className="sub-menu">
                        <li><Link className="link-name" to="#">Master Data</Link></li>
                        {
                            permissionCek(props.user_permission, 'GET_USER') ?
                            <li><Link to="/users">User</Link></li> : null
                        }
                        {
                            permissionCek(props.user_permission, 'GET_ROLE') ?
                            <li><Link to="/user-role">User Role</Link></li> : null
                        }
                        {
                            permissionCek(props.user_permission, 'GET_STORE') ?
                            <li><Link to="/store">Store</Link></li> :  null
                        }
                            <li><Link to="/product">Product</Link></li>
                        {
                            permissionCek(props.user_permission, 'GET_SERVICE_CENTER') ?
                            <li><Link to="/service-center/list">Service Center</Link></li> : null
                        }
                        {
                            permissionCek(props.user_permission, 'GET_CUSTOMER_VOICE') ?
                            <li><Link to="/customer-voice/list">Customer Voice</Link></li> : null
                        } 
                        {
                            permissionCek(props.user_permission, 'GET_CATEGORY') ?
                            <li><Link to="/category-article/list">Category Article</Link></li> : null
                        }
                    </ul>
                </li>

                {
                    permissionCek(props.user_permission, 'GET_ARTICLE') ?
                    <li>
                        <Link to="/article/list">
                            <i className="material-icons-outlined"> article </i>
                            <span className="link-name">Article</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link-name" to="#">Article</Link></li>
                        </ul>
                    </li> : null
                }

                {
                    permissionCek(props.user_permission, 'GET_BANNER') ?
                    <li>
                        <Link to="/banner/list">
                            <i className="material-icons-outlined"> view_carousel </i>
                            <span className="link-name">Banner</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link-name" to="#">Banner</Link></li>
                        </ul>
                    </li> : null
                }

                <li>
                    <div className="icon-link drop-down-menu">
                        <i className="material-icons-outlined"> people </i>
                        <span className="link-name">Customer</span>
                        <i className="material-icons-outlined arrow"> expand_more </i>
                    </div>
                    <ul className="sub-menu">
                        <li><Link className="link-name" to="/users">Customer</Link></li>
                        {
                            permissionCek(props.user_permission, 'GET_REGISTER_CUSTOMER') ?
                            <li><Link to="/customer/registered-customer">Register Customer</Link></li> : null
                        }
                        {
                            permissionCek(props.user_permission, 'GET_REGISTER_PRODUCT') ?
                            <li><Link to="/customer/registered-product">Registered Product</Link></li> : null
                        }
                        <li><Link to="/customer/status-service">Status Service</Link></li>
                    </ul>
                </li>

                <li>
                    <Link to="/report">
                        <i className="material-icons-outlined"> bar_chart </i>
                        <span className="link-name">Report</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link-name" to="report">Report</Link></li>
                    </ul>
                </li>
                {
                    permissionCek(props.user_permission, 'GET_MESSAGE') ?
                    <li>
                        <Link to="/message">
                            <i className="material-icons-outlined"> mail </i>
                            <span className="link-name">Message</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link-name" to="/message">Message</Link></li>
                        </ul>
                    </li> : null
                }

                <li>
                    <div className="icon-link drop-down-menu">
                        <i class="material-icons-outlined"> settings </i>
                        <span className="link-name">Settings</span>
                        <i className="material-icons-outlined arrow"> expand_more </i>
                    </div>
                    <ul className="sub-menu">
                        <li><Link className="link-name" to="/users">Settings</Link></li>
                        <li><Link to="/setting/about">About</Link></li>
                        <li><Link to="/setting/contact-footer">Contact Footer</Link></li>
                        <li><Link to="/setting/contact-information">Contact Information</Link></li>
                        <li><Link to="/setting/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/setting/web-config">Web Config</Link></li>
                    </ul>
                </li>

                
            </ul>
        </div>
    );
}

const SidebarNavigation = () => {
    let arrow = document.getElementsByClassName('drop-down-menu')
    for( let i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener('click', (e) => {
            let arrowParent = e.target.closest('.drop-down-menu').parentElement
            for( let z = 0; z < arrow.length; z++) {
                if(arrow[z].parentElement != arrowParent) {
                    arrow[z].parentElement.classList.remove('show-menu')
                }
            }
            
            arrowParent.classList.toggle('show-menu')
        })
    }
}

const mapStateToProps = (state) => {
    return {
        user_permission: state.USER_PERMISSION
    }
}
export default connect(mapStateToProps, null) (Sidebar);