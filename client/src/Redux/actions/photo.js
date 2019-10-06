import { UPLOAD_SUCCESS, UPLOAD_FAILURE } from "./types";
import axios from 'axios';
import { setAlert } from './alert'

// Upload all photos
export const uploadPhotos = (formData) => async dispatch => {
    try {
        await axios.post(`/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => console.log(progressEvent.loaded)
        })
        dispatch({
            type: UPLOAD_SUCCESS
        })
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