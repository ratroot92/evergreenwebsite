/* eslint-disable  */

const { default: apiServer } = require('../../config/axios.config');

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

const getAllCategories = (payload = {}) => {
  return async (dispatch) => {
    try {
      const { status, data } = await apiServer.get(`/category`);
      if (status === 200) {
        dispatch({ type: GET_ALL_CATEGORIES, payload: data.data });
      } else {
        dispatch({ type: GET_ALL_CATEGORIES, payload: [] });
      }
    } catch (err) {
      dispatch({ type: GET_ALL_CATEGORIES, payload: [] });
    }
  };
};
const uploadCategoryAvatar = (payload = {}) => {
  return async (dispatch) => {
    try {
      const { status, data } = await apiServer.post(`/category/${payload.id}/media/images`, payload.data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (status === 200) {
        dispatch({ type: SET_SELECTED_CATEGORY, payload: data.data });
      } else {
        dispatch({ type: SET_SELECTED_CATEGORY, payload: [] });
      }
    } catch (err) {
      dispatch({ type: SET_SELECTED_CATEGORY, payload: [] });
    }
  };
};
const getCategoryById = (payload = {}) => {
  return async (dispatch) => {
    try {
      const { status, data } = await apiServer.get(`/category/${payload}`);
      if (status === 200) {
        dispatch({ type: SET_SELECTED_CATEGORY, payload: data.data });
      } else {
        dispatch({ type: SET_SELECTED_CATEGORY, payload: {} });
      }
    } catch (err) {
      dispatch({ type: SET_SELECTED_CATEGORY, payload: {} });
    }
  };
};

const addNewCategory = (payload = {}) => {
  return async (dispatch) => {
    try {
      const { status, data } = await apiServer.post(`/category`, payload);
      if (status === 200) {
        dispatch({ type: ADD_NEW_CATEGORY, payload: data.data });
      }
    } catch (err) {
      if (err.status) {
        switch (err.status) {
          case 409:
            return dispatch({ type: 'SET_ERROR', payload: `${err.message}` });
        }
      }
    }
  };
};

export { getAllCategories, addNewCategory, getCategoryById, uploadCategoryAvatar };
