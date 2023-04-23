/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from "axios";

const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 100000000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

apiServer.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers.authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

apiServer.interceptors.response.use(
  (response) => {
    if (response.data) {
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        return response;
      }
      return response;
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        return Promise.reject({
          status: error.response.status,
          message: error.response.data.message,
        });
      }
      if (error.response.status === 422) {
        return Promise.reject({
          status: error.response.status,
          message: error.response.data.errors[0].message,
        });
      }
      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
    return Promise.reject(error);
  }
);
export default apiServer;
