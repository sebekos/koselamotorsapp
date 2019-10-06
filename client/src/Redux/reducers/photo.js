import {
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
    UPLOAD_PROGRESS,
    GET_PHOTOS,
    GET_PHOTOS_FAILURE
} from '../actions/types';

const initialState = {
    photos: [],
    loading: true,
    progressbar: 0,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PHOTOS:
            return {
                ...state,
                photos: payload,
                loading: false
            };
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
        case GET_PHOTOS_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

