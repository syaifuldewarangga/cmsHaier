import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { 
  BASE_URL, 
  FRONTEND_URL, 
  GSIS_URL, 
  GTM_TOKEN_URL, 
  GTM_URL, 
  URL 
} from './variable/reduxVariableDevelopment';

const initialCredential = {
  BASE_URL: BASE_URL,
  URL: URL,
  GTM_URL: GTM_URL,
  GTM_TOKEN_URL: GTM_TOKEN_URL,
  GSIS_URL: GSIS_URL,
  FRONTEND_URL: FRONTEND_URL,
  GTM_TOKEN: '',
  ADMIN_LOGIN: false,
  CUSTOMER_LOGIN: false,
  USER: {
    fullname: '',
    phone_number: '',
    username: '',
    photo: '',
  },
  USER_PERMISSION: [],
  DATA_SEARCH_SERVICE_CENTER: '',
};

const credentialReducer = (state = initialCredential, action) => {
  switch (action.type) {
    case 'CHANGE_ADMIN_LOGIN':
      return {
        ...state,
        ADMIN_LOGIN: action.value,
      };
    case 'CHANGE_CUSTOMER_LOGIN':
      return {
        ...state,
        CUSTOMER_LOGIN: action.value,
      };
    case 'CHANGE_USER':
      return {
        ...state,
        USER: action.value,
      };
    case 'CHANGE_USER_PERMISSION': 
      return {
        ...state,
        USER_PERMISSION: action.value,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        GTM_TOKEN: action.value,
      };
    case 'SET_DATA_SEARCH_SERVICE_CENTER':
      return {
        ...state,
        DATA_SEARCH_SERVICE_CENTER: action.value,
      };
    default:
      if ( localStorage.getItem('access_token') !== null && localStorage.getItem('role') !== null ) {
        const role = localStorage.getItem('role');
        if (role === 'CUSTOMER') {
          return {
            ...state,
            CUSTOMER_LOGIN: true,
            USER: {
              fullname: localStorage.getItem('fullname'),
              phone_number: localStorage.getItem('phone'),
              username: localStorage.getItem('username'),
              photo:
                localStorage.getItem('photo') !== null
                  ? localStorage.getItem('photo')
                  : '',
            },
          };
        } else {
          return {
            ...state,
            ADMIN_LOGIN: true,
            USER: {
              fullname: localStorage.getItem('fullname'),
              phone_number: localStorage.getItem('phone'),
              username: localStorage.getItem('username'),
              photo:
                localStorage.getItem('photo') !== null
                  ? localStorage.getItem('photo')
                  : '',
            },
          };
        }
      } else {
        localStorage.clear();
        return state;
      }
  }
};

const store = createStore(credentialReducer, applyMiddleware(thunk));

export default store;
