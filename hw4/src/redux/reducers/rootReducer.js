import { combineReducers } from "redux";
import notesReducer from "./notesReducer.js";

const rootReducer = combineReducers({
    notes: notesReducer,
});

export default rootReducer;