import {
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
    UPLOAD_PROGRESS,
    GET_PHOTOS,
    GET_PHOTOS_FAILURE,
    DELETE_PHOTOS,
    GET_ONE_GALLERY,
    PHOTO_LOADING,
    ADD_GALLERY
} from '../actions/types';

const initialState = {
    photos: [],
    oneGallery: [],
    loading: true,
    progressbar: 0,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_GALLERY:
            return {
                ...state,
                photos: payload,
                loading: false
            };
        case PHOTO_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PHOTOS:
            return {
                ...state,
                photos: payload,
                loading: false
            };
        case GET_ONE_GALLERY:
            return {
                ...state,
                oneGallery: payload,
                loading: false
            };
        case UPLOAD_SUCCESS:
            return {
                ...state,
                progressbar: 1,
                photos: [...state.photos, payload],
                loading: false
            };
        case UPLOAD_PROGRESS:
            return {
                ...state,
                progressbar: 1,
                loading: false
            };
        case DELETE_PHOTOS:
            return {
                ...state,
                photos: payload,
                loading: false
            }
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

