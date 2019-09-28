import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/types';

const initialState = {
    modalIsOpen: false,
    text: '',
    name: '',
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case OPEN_MODAL:
            return {
                modalIsOpen: true,
                text: payload.text,
                name: payload.name,
                loading: false
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modalIsOpen: false
            };
        default:
            return state;
    }
}

