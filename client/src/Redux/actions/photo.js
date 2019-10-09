import { UPLOAD_SUCCESS, UPLOAD_FAILURE, GET_PHOTOS, GET_PHOTOS_FAILURE, DELETE_PHOTOS } from "./types";
import axios from 'axios';
import { setAlert } from './alert'

// Get all photos
export const getPhotos = () => async dispatch => {
    try {
        const res = await axios.get(`/api/photo`);
        dispatch({
            type: GET_PHOTOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_PHOTOS_FAILURE,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Upload all photos
export const uploadPhotos = (formData) => async dispatch => {
    try {
        const res = await axios.post(`/api/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            }
        })
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
}

// Delete photos
export const deletePhotos = (photos) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/photo/delete', photos, config);
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
}