import { GET_INVENTORY, GET_INVENTORY_FAIL, INVENTORY_LOADING, ADD_INVENTORY, ADD_INVENTORY_FAIL } from "../constants/types";

const initialState = {
    car_items: [],
    loading: false,
    fetch_car_items: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_INVENTORY:
            return {
                ...state,
                car_items: payload,
                loading: false,
                fetch_car_items: false
            };
        case INVENTORY_LOADING:
            return {
                ...state,
                loading: payload
            };
        case ADD_INVENTORY:
            return {
                ...state,
                car_items: [payload, ...state.car_items],
                loading: false
            };
        case GET_INVENTORY_FAIL:
        case ADD_INVENTORY_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
