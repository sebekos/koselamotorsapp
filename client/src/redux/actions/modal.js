import axios from "axios";
import { setAlert } from "./alert";
import { OPEN_MODAL, CLOSE_MODAL, TEXT_SUCCESS, TEXT_FAILURE } from "../constants/types";

// Open modal
export const openModal = (data) => (dispatch) => {
    dispatch({
        type: OPEN_MODAL,
        payload: data
    });
};

// Close modal
export const closeModal = () => (dispatch) => {
    dispatch({
        type: CLOSE_MODAL
    });
};

// Add Text or Update
export const updateText = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/text", formData, config);
        dispatch({
            type: TEXT_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert("Text Updated", "success"));
        closeModal();
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: TEXT_FAILURE,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
