import axios from 'axios';

import store from '../store';
import { toggleSignin } from '../actions/actionTypes';

export function setAccessToken(token) {
    axios.defaults.headers.common.Authorization = token;
}

export const clearToken = () => {
    localStorage.removeItem('token');
    setAccessToken(null);
};

const axiosInterceptor = () => {
  axios.interceptors.response.use(undefined, (error) => {
    // Do something with response error
    if (error.response.status === 401) {
      console.log('401 unauthorised');
      clearToken();
      store.dispatch(toggleSignin());
    }
    return Promise.reject(error);
  });
};

export function getAccessToken() {
  const token = localStorage.getItem('token');
  return token || null;
}

const axiosConfig = () => {
  const token = getAccessToken();
  if (token) {
    setAccessToken(token);
  }
  axiosInterceptor();
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
  setAccessToken(token);
};


export default axiosConfig;
