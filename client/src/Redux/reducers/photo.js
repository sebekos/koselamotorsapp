import {
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
    UPLOAD_PROGRESS
} from '../actions/types';

const initialState = {
    loading: true,
    progressbar: 0,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPLOAD_SUCCESS:
            return {
                ...state,
                progressbar: 1,
                loading: false
            };
        case UPLOAD_PROGRESS:
            return {
                ...state,
                progressbar: 1,
                loading: false
            };
        case UPLOAD_FAILURE:
            return {
                ...state,
                progressbar: 0,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

