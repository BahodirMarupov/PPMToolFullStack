import {combineReducers} from "redux"
import errorReducer from "./errorReducer"
import projectReducers from "./projectReducers"

export default combineReducers({
    errors:errorReducer,
    projects:projectReducers
})
