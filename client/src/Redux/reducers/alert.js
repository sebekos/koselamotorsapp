import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from '../actions/types';

const initialState = [];

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SET_ALERT:
            return payload;
        case REMOVE_ALERT:
            return [];
        default:
            return state;
    }
}