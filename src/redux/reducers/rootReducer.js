import {combineReducers} from "redux";
import {newsReducer} from "./newsReducer";
import {appReducer} from "./appReducer";
import {currencyReducer} from "./currencyReducer";

export const rootReducer = combineReducers({
    currencyReducer,
    newsReducer,
    appReducer,
});