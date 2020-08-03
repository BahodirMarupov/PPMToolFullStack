import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducers from "./projectReducers";
import backlogReducer from "./backlogReducer";

export default combineReducers({
  errors: errorReducer,
  projects: projectReducers,
  backlog: backlogReducer,
});
