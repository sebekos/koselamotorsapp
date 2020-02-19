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
    SAVE_EDIT_FAILURE,
    SAVE_EDIT_GALLERY,
    TOGGLE_PROGRESS_BAR,
    PROGRESS_BAR_VALUE,
    TOGGLE_ADD_GALLERY
} from "../actions/types";

const initialState = {
    photos: [],
    oneGallery: [],
    loading: true,
    progressbar: false,
    progressbarvalue: 0,
    showAddGallery: false,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_GALLERY:
            return {
                ...state,
                photos: [payload, ...state.photos],
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
                photos: state.photos.map(group => {
                    if (group._id === payload.group) {
                        group.photos = payload.photos;
                        return group;
                    } else {
                        return group;
                    }
                }),
                loading: false
            };
        case DELETE_GALLERY:
            return {
                ...state,
                photos: state.photos.filter(gallery => {
                    return gallery._id !== payload;
                }),
                loading: false
            };
        case DELETE_PHOTOS:
            return {
                ...state,
                photos: state.photos.map(gallery => {
                    if (gallery._id === payload._id) {
                        return payload;
                    } else {
                        return gallery;
                    }
                }),
                loading: false
            };
        case UPLOAD_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case GET_PHOTOS_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case SAVE_EDIT_GALLERY:
            return {
                ...state,
                photos: state.photos.map(group => {
                    if (group._id === payload._id) {
                        return payload;
                    } else {
                        return group;
                    }
                }),
                loading: false
            };
        case SAVE_EDIT_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case TOGGLE_PROGRESS_BAR:
            return {
                ...state,
                progressbar: payload
            };
        case PROGRESS_BAR_VALUE:
            return {
                ...state,
                progressbarvalue: payload
            };
        case TOGGLE_ADD_GALLERY:
            return {
                ...state,
                showAddGallery: payload
            };
        default:
            return state;
    }
}
