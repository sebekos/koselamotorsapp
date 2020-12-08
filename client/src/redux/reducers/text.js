import { GET_TEXT, TEXT_SUCCESS, TEXT_FAILURE } from "../constants/types";

const initialState = {
    fields: {},
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TEXT:
            return {
                ...state,
                fields: payload,
                loading: false
            };
        case TEXT_SUCCESS:
            var tempFields = state.fields;
            tempFields[payload.name] = payload.text;
            return {
                ...state,
                fields: tempFields
            };
        case TEXT_FAILURE:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
