import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'

class Sidebar extends Component 
{
    componentDidMount() {
        SidebarNavigation();
    }

    render() {
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
                            <li><Link to="/users">User</Link></li>
                            <li><Link to="/user-role">User Role</Link></li>
                            <li><Link to="/store">Store</Link></li>
                            <li><Link to="/product">Product</Link></li>
                            <li><Link to="/service-center/list">Service Center</Link></li>
                            <li><Link to="/customer-voice/list">Customer Voice</Link></li>
                            <li><Link to="/category-article/list">Category Article</Link></li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/article/list">
                            <i className="material-icons-outlined"> article </i>
                            <span className="link-name">Article</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link-name" to="#">Article</Link></li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/banner/list">
                            <i className="material-icons-outlined"> view_carousel </i>
                            <span className="link-name">Banner</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link-name" to="#">Banner</Link></li>
                        </ul>
                    </li>

                    <li>
                        <div className="icon-link drop-down-menu">
                            <i className="material-icons-outlined"> people </i>
                            <span className="link-name">Customer</span>
                            <i className="material-icons-outlined arrow"> expand_more </i>
                        </div>
                        <ul className="sub-menu">
                            <li><Link className="link-name" to="/users">Customer</Link></li>
                            <li><Link to="/customer/registered-customer">Register Customer</Link></li>
                            <li><Link to="/customer/registered-product">Registered Product</Link></li>
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
                    <li>
                        <Link to="/message">
                            <i className="material-icons-outlined"> mail </i>
                            <span className="link-name">Message</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link-name" to="/message">Message</Link></li>
                        </ul>
                    </li>

                    <li>
                        <div className="icon-link drop-down-menu">
                            <i class="material-icons-outlined"> settings </i>
                            <span className="link-name">Customer</span>
                            <i className="material-icons-outlined arrow"> expand_more </i>
                        </div>
                        <ul className="sub-menu">
                            <li><Link className="link-name" to="/users">Settings</Link></li>
                            <li><Link to="/setting/about">About</Link></li>
                            <li><Link to="/setting/contact-footer">Contact Footer</Link></li>
                            <li><Link to="/setting/contact-information">Contact Information</Link></li>
                            <li><Link to="/customer/status-service">Web Config</Link></li>
                        </ul>
                    </li>

                    
                </ul>
            </div>
        );
    }
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

export default Sidebar;