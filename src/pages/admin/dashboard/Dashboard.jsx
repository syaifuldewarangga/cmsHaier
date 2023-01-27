import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminRoute from '../../../component/authentication/AdminRoute';
import AboutList from '../../../component/dahboard/about/AboutlList';
import FormAbout from '../../../component/dahboard/about/formAbout/FormAbout';
import AdminProfile from '../../../component/dahboard/adminProfile/AdminProfile';
import AddArticle from '../../../component/dahboard/article/addArticle/AddArticle';
import ArticleList from '../../../component/dahboard/article/ArticleList';
import CategoryArticle from '../../../component/dahboard/article/categoryArticle/CategoryArticle';
import EditArticle from '../../../component/dahboard/article/editArticle/editArticle';
import AddBanner from '../../../component/dahboard/banner/addBanner/AddBanner';
import BannerList from '../../../component/dahboard/banner/BannerList';
import EditBanner from '../../../component/dahboard/banner/editBanner/EditBanner';
import ContactInformationList from '../../../component/dahboard/contact/ContactInformationList';
import ContactListFooter from '../../../component/dahboard/contact/ContactListFooter';
import FormContactFooter from '../../../component/dahboard/contact/formContactFooter/FormContactFooter';
import FormContactInformation from '../../../component/dahboard/contact/formContactInformation/FormContactInformation';
import DetailCustomer from '../../../component/dahboard/customer/registeredCustomer/detailCustomer/DetailCustomer';
import RegisteredCustomer from '../../../component/dahboard/customer/registeredCustomer/RegisteredCustomer';
import RegisteredProduct from '../../../component/dahboard/customer/registeredProduct/RegisteredProduct';
import RegisteredProductListByUser from '../../../component/dahboard/customer/registeredProduct/RegisteredProductListByUser';
import StatusService from '../../../component/dahboard/customer/statusService/StatusService';
import StatusServiceDetail from '../../../component/dahboard/customer/statusService/statusServiceDetail/StatusServiceDetail';
import AddCustomerVoice from '../../../component/dahboard/customerVoice/addCustomerVoice/AddCustomerVoice';
import CustomerVoiceList from '../../../component/dahboard/customerVoice/CustomerVoiceList';
import EditCustomerVoice from '../../../component/dahboard/customerVoice/editCustomerVoice/EditCustomerVoice';
import DashboardComponent from '../../../component/dahboard/dashboardComponent/DashboardComponent';
import Message from '../../../component/dahboard/message/Message';
import FormPrivacyPolicy from '../../../component/dahboard/PrivacyPolicy/FormPrivacyPolicy';
import PrivacyPolicy from '../../../component/dahboard/PrivacyPolicy/PrivacyPolicy';
import ProductList from '../../../component/dahboard/product/ProductList';
import AddPromo from '../../../component/dahboard/promo/AddPromo';
import EditPromo from '../../../component/dahboard/promo/EditPromo';
import PromoList from '../../../component/dahboard/promo/PromoList';
import Report from '../../../component/dahboard/report/Report';
import ResetPasswordAdmin from '../../../component/dahboard/resetPasswordAdmin/ResetPasswordAdmin';
import CreateServiceCenter from '../../../component/dahboard/serviceCenter/createServiceCenter/CreateServiceCenter';
import EditServiceCenter from '../../../component/dahboard/serviceCenter/editServiceCenter/EditServiceCenter';
import ServiceCenterList from '../../../component/dahboard/serviceCenter/ServiceCenterList';
import StoreList from '../../../component/dahboard/store/StoreList';
import AddUser from '../../../component/dahboard/user/addUser/AddUser';
import DetailUser from '../../../component/dahboard/user/detailUser/DetailUser';
import EditUser from '../../../component/dahboard/user/editUser/editUser';
import UserList from '../../../component/dahboard/user/userList/UserList';
import AddUserRole from '../../../component/dahboard/user/userRole/addUserRole/AddUserRole';
import EditUserRole from '../../../component/dahboard/user/userRole/editUserRole/EditUserRole';
import UserRole from '../../../component/dahboard/user/userRole/UserRole';
import WebConfig from '../../../component/dahboard/webConfig/WebConfig';
import NotFound from '../../../component/errorPage/notFound/Notfound';
import ChangePassword from '../../forgotPassword/changePassword/ChangePassword';
import ForgotPassword from '../../forgotPassword/forgotPassword/ForgotPassword';
import FormOtp from '../../forgotPassword/formOtp/FormOtp';
import AdminLogin from '../AdminLogin';
import './Dashboard.css';

//product validate
import ProductValidateList from '../../../component/dahboard/product_validate/ProductValidateList'
import EditProductValidateList from '../../../component/dahboard/product_validate/EditProductValidate'

// history promo
import HistoryPromoList from '../../../component/dahboard/promo/history_promo/HistoryPromoList';

class Dashboard extends Component {
  componentDidMount() {
    document.body.style = 'background: #f5f5f5;';
  }
  render() {
    return (
      <div>
        <Router forceRefresh={true} basename={'/cms'}>
          <Switch>
            <Route exact path="/forgot-password/" component={ForgotPassword} ></Route>
            <Route exact path="/otp/:userID" component={FormOtp}></Route>
            <Route exact path="/reset-password/:userID/:tokenReset" component={ChangePassword} ></Route>

            <Route exact path="/" component={AdminLogin}></Route>
            <AdminRoute path="/dashboard" component={DashboardComponent} />

            <AdminRoute exact path="/users" component={UserList} />
            <AdminRoute exact path="/users/add" component={AddUser} />
            <AdminRoute exact path="/users/edit/:username" component={EditUser} />
            <AdminRoute exact path="/users/detail/:id" component={DetailUser} />

            <AdminRoute exact path="/user-role" component={UserRole} />
            <AdminRoute exact path="/user-role/add" component={AddUserRole} />
            <AdminRoute exact path="/user-role/edit/:role_name" component={EditUserRole} />

            <AdminRoute exact path="/store" component={StoreList} />
            <AdminRoute exact path="/product" component={ProductList} />
            <AdminRoute exact path="/service-center/list" component={ServiceCenterList} />
            <AdminRoute exact path="/service-center/add" component={CreateServiceCenter} />
            <AdminRoute exact path="/service-center/edit/:id" component={EditServiceCenter} />

            <AdminRoute exact path="/customer-voice/list" component={CustomerVoiceList} />

            <AdminRoute exact path="/customer-voice/add" component={AddCustomerVoice} />

            <AdminRoute exact path="/customer-voice/edit/:id" component={EditCustomerVoice} />

            <AdminRoute exact path="/category-article/list" component={CategoryArticle} />

            {/* product validate */}
            <AdminRoute exact path="/product-validate/list" component={ProductValidateList} />
            <AdminRoute exact path="/product-validate/edit/:id" component={EditProductValidateList} />

            <AdminRoute exact path="/article/list" component={ArticleList} />
            <AdminRoute exact path="/article/add" component={AddArticle} />
            <AdminRoute exact path="/article/edit/:slug" component={EditArticle} />

            <AdminRoute exact path="/banner/list" component={BannerList} />
            <AdminRoute exact path="/banner/add" component={AddBanner} />
            <AdminRoute exact path="/banner/edit/:id" component={EditBanner} />

            <AdminRoute exact path="/customer/registered-customer" component={RegisteredCustomer} />
            <AdminRoute exact path="/customer/registered-customer/:username" component={DetailCustomer} />

            <AdminRoute exact path="/customer/registered-product" component={RegisteredProduct} />
            <AdminRoute exact path="/customer/registered-product/user/:userID" component={RegisteredProductListByUser} />

            <AdminRoute exact path="/customer/status-service" component={StatusService} />
            <AdminRoute exact path="/customer/status-service/detail/:srNumber/:phone_number" component={StatusServiceDetail} />

            <AdminRoute exact path="/report" component={Report} />

            <AdminRoute exact path="/message" component={Message} />

            <AdminRoute exact path="/setting/about" component={AboutList} />
            <AdminRoute exact path="/setting/about/edit" component={FormAbout} />
            <AdminRoute exact path="/setting/contact-footer" component={ContactListFooter} />
            <AdminRoute exact path="/setting/contact-footer/edit" component={FormContactFooter} />
            <AdminRoute exact path="/setting/contact-information" component={ContactInformationList} />
            <AdminRoute exact path="/setting/contact-information/edit" component={FormContactInformation} />
            <AdminRoute exact path="/setting/privacy-policy" component={PrivacyPolicy} />
            <AdminRoute exact path="/setting/privacy-policy/edit" component={FormPrivacyPolicy} />
            {/* <AdminRoute exact path="/setting/web-config" component={WebConfig} />  */}

            <AdminRoute exact path="/change-password-admin" component={ResetPasswordAdmin} />
            <AdminRoute exact path="/admin-profile" component={AdminProfile} />

            {/* Promo */}
            <AdminRoute exact path="/promo" component={PromoList} />
            <AdminRoute exact path="/promo/add" component={AddPromo} />
            <AdminRoute exact path="/promo/edit/:id" component={EditPromo} />

            {/* History Promo */}
            <AdminRoute exact path="/history-promo" component={HistoryPromoList} />

            
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Dashboard;
