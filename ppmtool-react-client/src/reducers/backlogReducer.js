import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "../actions/types";

const initialState = {
  project_tasks: [],
  project_task: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BACKLOG:
      return { ...state, project_tasks: payload };

    case GET_PROJECT_TASK:
      return { ...state, project_task: payload };

    case DELETE_PROJECT_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (e) => e.projectSequence !== payload
        ),
      };
    default:
      return state;
  }
};
