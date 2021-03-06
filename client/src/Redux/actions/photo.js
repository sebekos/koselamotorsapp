import {
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
    GET_PHOTOS,
    GET_PHOTOS_FAILURE,
    DELETE_PHOTOS,
    GET_ONE_GALLERY,
    PHOTO_LOADING,
    ADD_GALLERY,
    DELETE_GALLERY,
    SAVE_EDIT_GALLERY,
    SAVE_EDIT_FAILURE,
    TOGGLE_PROGRESS_BAR,
    PROGRESS_BAR_VALUE,
    TOGGLE_ADD_GALLERY
} from "../constants/types";
import axios from "axios";
import { setAlert } from "./alert";

// Get all photos
export const getPhotos = () => async (dispatch) => {
    try {
        const res = await axios.get(`/api/photo`);
        dispatch({
            type: GET_PHOTOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_PHOTOS_FAILURE,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get one gallery
export const getOneGallery = (id) => async (dispatch) => {
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
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add new gallery
export const addGallery = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/photo/gallery", formData, config);
        dispatch({
            type: ADD_GALLERY,
            payload: res.data
        });
        dispatch(setAlert("Gallery Added", "success"));
        dispatch({
            type: TOGGLE_ADD_GALLERY,
            payload: false
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: GET_PHOTOS_FAILURE,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Upload all photos
export const uploadPhotos = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: TOGGLE_PROGRESS_BAR,
            payload: true
        });
        const res = await axios.post(`/api/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                dispatch({
                    type: PROGRESS_BAR_VALUE,
                    payload: (loaded / total) * 100
                });
            }
        });
        dispatch({
            type: TOGGLE_PROGRESS_BAR,
            payload: false
        });
        dispatch({
            type: UPLOAD_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert("Photos uploaded", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: UPLOAD_FAILURE,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Delete photos
export const deletePhotos = (data) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/photo/delete", data, config);
        dispatch({
            type: DELETE_PHOTOS,
            payload: res.data
        });
        dispatch(setAlert("Photos updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: UPLOAD_FAILURE,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Delete gallery
export const deleteGallery = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/photo/gallery/${id}`);
        dispatch({
            type: DELETE_GALLERY,
            payload: res.data
        });
        dispatch(setAlert("Gallery deleted", "success"));
    } catch (err) {
        dispatch({
            type: UPLOAD_FAILURE,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Update gallery info
export const updateGalleryInfo = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/photo/text", formData, config);
        dispatch({
            type: SAVE_EDIT_GALLERY,
            payload: res.data
        });
        dispatch(setAlert("Gallery Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: SAVE_EDIT_FAILURE,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Set photo loading true
export const setPhotoLoading = () => async (dispatch) => {
    dispatch({
        type: PHOTO_LOADING
    });
};

// Toggle progress bar
export const toggleProgressBar = (value) => async (dispatch) => {
    dispatch({
        type: TOGGLE_PROGRESS_BAR,
        payload: value
    });
};

// Progress bar value
export const progressBarValue = (value) => async (dispatch) => {
    dispatch({
        type: PROGRESS_BAR_VALUE,
        payload: value
    });
};

// Toggle add gallery
export const toggleAddGallery = (value) => async (dispatch) => {
    dispatch({
        type: TOGGLE_ADD_GALLERY,
        payload: value
    });
};
