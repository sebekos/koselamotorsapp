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
    DELETE_INVENTORY_FAIL,
    REMOVE_MEDIA,
    SAVE_MEDIA,
    SAVE_MEDIA_FAILED
} from "../constants/types";
import { toast } from "react-toastify";
import axios from "axios";

// Get all inventories
export const getInventory = () => async (dispatch) => {
    dispatch(setInventoryLoading(true));
    try {
        const res = await axios.get(`/api/inventory`);
        dispatch({
            type: GET_INVENTORY,
            payload: res.data
        });
    } catch (err) {
        toast.error(err.response.statusText);
        dispatch({
            type: GET_INVENTORY_FAIL,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get one inventory
export const getOneInventory = (inventory_id) => async (dispatch) => {
    dispatch(setInventoryLoading(true));
    try {
        const res = await axios.get(`/api/inventory/info/${inventory_id}`);
        dispatch({
            type: GET_ONE_INVENTORY,
            payload: res.data
        });
    } catch (err) {
        toast.error(err.response.statusText);
        dispatch({
            type: GET_INVENTORY_FAIL,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add new inventory
export const addInventory = (formData) => async (dispatch) => {
    dispatch(setAddInventoryLoading(true));
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/inventory", formData, config);
        dispatch({
            type: ADD_INVENTORY,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        }
        dispatch({
            type: ADD_INVENTORY_FAIL,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Update inventory
export const updateInventory = (formData) => async (dispatch) => {
    dispatch(setUpdateInventoryLoading(true));
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/inventory/update", formData, config);
        dispatch({
            type: UPDATE_INVENTORY,
            payload: res.data
        });
        toast.success("Inventory updated");
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        }
        dispatch({
            type: UPDATE_INVENTORY_FAIL,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get one inventory
export const deleteInventory = (inventory_id) => async (dispatch) => {
    dispatch(setInventoryLoading(true));
    try {
        const res = await axios.post(`/api/inventory/delete/${inventory_id}`);
        dispatch({
            type: DELETE_INVENTORY,
            payload: res.data
        });
    } catch (err) {
        toast.error(err.response.statusText);
        dispatch({
            type: DELETE_INVENTORY_FAIL,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get one inventory
export const saveMedia = (photos, inventory_id) => async (dispatch) => {
    dispatch(setInventoryLoading(true));
    try {
        const body = {
            photos
        };
        await axios.post(`/api/inventory/savemedia/${inventory_id}`, body);
        toast.success("Photos updated");
    } catch (err) {
        toast.error(err.response.statusText);
        dispatch({
            type: SAVE_MEDIA_FAILED,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
    dispatch(setInventoryLoading(false));
};

// Remove a photo
export const removeMedia = (url) => async (dispatch) => {
    dispatch({
        type: REMOVE_MEDIA,
        payload: url
    });
};

// Set inventory loading true
export const setInventoryLoading = (payload) => async (dispatch) => {
    dispatch({
        type: INVENTORY_LOADING,
        payload
    });
};

// Set add inventory loading true
export const setAddInventoryLoading = (payload) => async (dispatch) => {
    dispatch({
        type: ADD_INVENTORY_LOADING,
        payload
    });
};

// Set update inventory loading true
export const setUpdateInventoryLoading = (payload) => async (dispatch) => {
    dispatch({
        type: UPDATE_INVENTORY_LOADING,
        payload
    });
};
