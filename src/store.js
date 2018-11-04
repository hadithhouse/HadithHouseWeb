import { createStore, combineReducers } from "redux";
import { layoutReducer } from "./containers/Layout";

const rootReducer = combineReducers({ layout: layoutReducer });
export default createStore(rootReducer);
