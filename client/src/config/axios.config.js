/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
// import { setLoading, setNotifier } from '../redux/actions/ui-actions';
// import store from '../redux/store';

const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 100000000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

apiServer.interceptors.request.use(
  (request) => {
    console.log('request');

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      request.headers.authorization = `Bearer ${accessToken}`;
    }
    // store.dispatch(setLoading(true));
    return request;
  },
  (error) => {
    console.log('=>', error);
    return Promise.reject(error);
  }
);

apiServer.interceptors.response.use(
  (response) => {
    console.log('response');
    if (response.data) {
      // setNotifier(response.data.message);
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        // store.dispatch(setLoading(false));
        return response;
      }
      // store.dispatch(setLoading(false));
      return response;
    }
    // store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    console.log(error);
    // store.dispatch(setLoading(false));
    // store.dispatch(setNotifier(error.message));
    return Promise.reject(error);
    //   if (error.response) {
    //     if (error.response.status === 401) {
    //       localStorage.clear();
    //       // return Promise.reject({ status: error.response.status, message: error.response.data.message });
    //     }
    //     if (error.response.status === 422) {
    //       // return Promise.reject({ status: error.response.status, message: error.response.data.errors[0].message });
    //     }
    //     // return Promise.reject({ status: error.response.status, message: error.response.data.message });
    //   }
    //   // return Promise.reject(error);
  }
);
export default apiServer;
