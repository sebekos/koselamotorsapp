import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  GET_PHOTOS,
  GET_PHOTOS_FAILURE,
  DELETE_PHOTOS,
  GET_ONE_GALLERY,
  PHOTO_LOADING,
  ADD_GALLERY,
  DELETE_GALLERY
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all photos
export const getPhotos = () => async dispatch => {
  try {
    const res = await axios.get(`/api/photo`);
    dispatch({
      type: GET_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PHOTOS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get one gallery
export const getOneGallery = id => async dispatch => {
  dispatch(setPhotoLoading);
  try {
    const res = await axios.get(`/api/photo/${id}`);
    dispatch({
      type: GET_ONE_GALLERY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PHOTOS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add new gallery
export const addGallery = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/photo/gallery', formData, config);
    dispatch({
      type: ADD_GALLERY,
      payload: res.data
    });
    dispatch(setAlert('Gallery Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_PHOTOS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Upload all photos
export const uploadPhotos = formData => async dispatch => {
  try {
    const res = await axios.post(`/api/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch({
      type: UPLOAD_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Photo uploaded', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPLOAD_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete photos
export const deletePhotos = data => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/photo/delete', data, config);
    dispatch({
      type: DELETE_PHOTOS,
      payload: res.data
    });
    dispatch(setAlert('Photos updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPLOAD_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete gallery
export const deleteGallery = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/photo/gallery/${id}`);
    dispatch({
      type: DELETE_GALLERY,
      payload: res.data
    });
    dispatch(setAlert('Gallery deleted', 'success'));
  } catch (err) {
    dispatch({
      type: UPLOAD_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Set photo loading true
export const setPhotoLoading = () => async dispatch => {
  dispatch({
    type: PHOTO_LOADING
  });
};
