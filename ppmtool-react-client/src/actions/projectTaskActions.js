import Axios from "axios";
import {
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  GET_ERRORS,
  GET_BACKLOG,
} from "./types";

export const addProjectTask = (id, payload, history) => async (dispatch) => {
  try {
    await Axios.post("/api/backlog/" + id, payload);
    history.push("/projectBoard/" + id);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const updateProjectTask = (
  id,
  projectSequence,
  payload,
  history
) => async (dispatch) => {
  try {
    await Axios.patch("/api/backlog/" + id + "/" + projectSequence, payload);
    history.push("/projectBoard/" + id);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getBacklog = (id) => async (dispatch) => {
  try {
    let projectTasks = await Axios.get("/api/backlog/" + id);
    dispatch({
      type: GET_BACKLOG,
      payload: projectTasks.data,
    });
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getProjectTask = (id, projectSequence,history) => async (dispatch) => {
  try {
    let projectTask = await Axios.get(
      "/api/backlog/" + id + "/" + projectSequence
    );
    dispatch({
      type: GET_PROJECT_TASK,
      payload: projectTask.data,
    });
  } catch (error) {
    history.push("/dashboard")
  }
};

export const deleteProjectTask = (id, projectSequence) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure to erase project task " + projectSequence + " ?"
    )
  ) {
    await Axios.delete("/api/backlog/" + id + "/" + projectSequence);
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: projectSequence,
    });
  }
};
