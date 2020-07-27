import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, DELETE_PROJECT, GET_PROJECT } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post("/api/project", project);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getProjects = () => async (dispatch) => {
  let projects = await axios.get("/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: projects.data
  });
};

export const deleteProject = (projectIdentifier) => async (dispatch) => {
  if (window.confirm(`Are you sure to erase ${projectIdentifier} project?`)) {
    await axios.delete(`/api/project/${projectIdentifier}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: projectIdentifier
    });
  }
};

export const getProject= (projectIdentifier)=>async (dispatch)=>{
  let project=await axios.get(`/api/project/${projectIdentifier}`);
  dispatch({
    type:GET_PROJECT,
    payload:project.data
  });
}

export const clearErrors=()=>async(dispatch)=>{
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
}