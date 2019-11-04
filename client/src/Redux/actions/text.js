import axios from 'axios';
import { setAlert } from './alert';
import { closeModal } from './modal';
import { GET_TEXT, TEXT_SUCCESS, TEXT_FAILURE } from './types';

// Get all text
export const getText = () => async dispatch => {
  try {
    const res = await axios.get(`/api/text`);
    let textObj = {};
    res.data.forEach(item => {
      textObj[item.name] = item.text;
    });
    dispatch({
      type: GET_TEXT,
      payload: textObj
    });
  } catch (err) {
    dispatch({
      type: TEXT_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Text or Update
export const updateText = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/text', formData, config);
    dispatch({
      type: TEXT_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Text Updated', 'success'));
    dispatch(closeModal());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: TEXT_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
