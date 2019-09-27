import axios from 'axios';
import { setAlert } from './alert';
import {
    OPEN_MODAL,
    CLOSE_MODAL,
    TEXT_SUCCESS,
    TEXT_FAILURE
} from './types';


// Open modal
export const openModal = (data) => dispatch => {
    dispatch({
        type: OPEN_MODAL,
        payload: data
    });
}

// Close modal
export const closeModal = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL
    });
}