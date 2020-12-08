import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import modal from "./modal";
import text from "./text";
import photo from "./photo";
import inventory from "./inventory";

export default combineReducers({
    alert,
    auth,
    modal,
    text,
    photo,
    inventory
});
