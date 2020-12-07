import {
    GET_INVENTORY,
    GET_ONE_INVENTORY,
    GET_INVENTORY_FAIL,
    INVENTORY_LOADING,
    ADD_INVENTORY,
    ADD_INVENTORY_FAIL,
    ADD_INVENTORY_LOADING,
    UPDATE_INVENTORY,
    UPDATE_INVENTORY_LOADING,
    UPDATE_INVENTORY_FAIL,
    DELETE_INVENTORY,
    DELETE_INVENTORY_FAIL
} from "../constants/types";

const initialState = {
    car_items: [],
    car_item: {},
    loading: false,
    add_inventory_loading: false,
    update_inventory_loading: false,
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
        case GET_ONE_INVENTORY:
            return {
                ...state,
                car_item: payload,
                loading: false
            };
        case INVENTORY_LOADING:
            return {
                ...state,
                loading: payload
            };
        case ADD_INVENTORY_LOADING:
            return {
                ...state,
                add_inventory_loading: payload
            };
        case UPDATE_INVENTORY_LOADING:
            return {
                ...state,
                update_inventory_loading: true
            };
        case ADD_INVENTORY:
            return {
                ...state,
                car_items: [payload, ...state.car_items],
                add_inventory_loading: false
            };
        case UPDATE_INVENTORY:
            return {
                ...state,
                car_items: [payload, ...state.car_items],
                update_inventory_loading: false
            };
        case DELETE_INVENTORY:
            return {
                ...state,
                car_items: state.car_items.filter((o) => o._id != payload._id),
                loading: false
            };
        case GET_INVENTORY_FAIL:
        case ADD_INVENTORY_FAIL:
        case UPDATE_INVENTORY_FAIL:
        case DELETE_INVENTORY_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
                add_inventory_loading: false,
                update_inventory_loading: false
            };
        default:
            return state;
    }
}
