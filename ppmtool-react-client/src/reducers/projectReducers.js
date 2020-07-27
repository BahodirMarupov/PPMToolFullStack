import { GET_PROJECTS, DELETE_PROJECT, GET_PROJECT } from "../actions/types";

const initialState = {
  allProjects: [],
  project: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS:
      return { ...state, allProjects: payload };

    case DELETE_PROJECT:
      return {
        ...state,
        allProjects: state.allProjects.filter(
          (project) => project.projectIdentifier !== payload
        ),
      };

    case GET_PROJECT:
      return { ...state, project: payload };

    default:
      return state;
  }
};
