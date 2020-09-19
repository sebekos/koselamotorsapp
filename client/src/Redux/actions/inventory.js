import { GET_INVENTORY, GET_INVENTORY_FAIL, INVENTORY_LOADING, ADD_INVENTORY, ADD_INVENTORY_FAIL } from "../constants/types";
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

// Add new inventory
export const addInventory = (formData) => async (dispatch) => {
    dispatch(setInventoryLoading(true));
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

// Set photo loading true
export const setInventoryLoading = (payload) => async (dispatch) => {
    dispatch({
        type: INVENTORY_LOADING,
        payload
    });
};
