import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProject } from "../../../actions/projectActions";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/projectTaskActions";

class UpdateProjectTask extends Component {
  constructor() {
    super();
    this.state = {
      summary: "",
      acceptanceCriteria: "",
      dueDate: "",
      priority: "",
      status: "",
      errors: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    let newProjecTask = {
      ...this.props.projectTask,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      dueDate: this.state.dueDate,
      priority: this.state.priority,
      status: this.state.status,
    };
    this.props.updateProjectTask(
      this.props.match.params.id,
      this.props.match.params.task_id,
      newProjecTask,
      this.props.history
    );
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }
  componentWillMount() {
    this.props.getProjectTask(
      this.props.match.params.id,
      this.props.match.params.task_id,
      this.props.history
    );
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    if (!this.state.errors) {
      this.setState({
        summary: newProps.projectTask.summary,
        acceptanceCriteria: newProps.projectTask.acceptanceCriteria,
        dueDate: newProps.projectTask.dueDate,
        priority: newProps.projectTask.priority,
        status: newProps.projectTask.status,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="add-PBI">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link
                  to={`/projectBoard/${this.props.match.params.id}`}
                  className="btn btn-light"
                >
                  Back to Project Board
                </Link>
                <h4 className="display-4 text-center">Update Project Task</h4>
                <p className="lead text-center">
                  {this.props.project.projectName}{" "}
                  {this.props.project.projectIdentifier}
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`${
                        this.state.errors.summary && this.state.summary === ""
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }`}
                      name="summary"
                      placeholder="Project Task summary"
                      value={this.state.summary}
                      onChange={this.onChange}
                    />
                    <div className="invalid-feedback">
                      {this.state.errors.summary}
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Acceptance Criteria"
                      name="acceptanceCriteria"
                      onChange={this.onChange}
                      value={this.state.acceptanceCriteria}
                    ></textarea>
                  </div>
                  <h6>Due Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="dueDate"
                      onChange={this.onChange}
                      value={this.state.dueDate}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="priority"
                      onChange={this.onChange}
                      value={this.state.priority}
                    >
                      <option value={0}>Select Priority</option>
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="status"
                      onChange={this.onChange}
                      value={this.state.status}
                    >
                      <option value="">Select Status</option>
                      <option value="TO_DO">TO DO</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  getProject: PropTypes.func.isRequired,
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  projectTask: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  projectTask: state.backlog.project_task,
  project: state.projects.project,
});

export default connect(mapStateToProps, {
  getProject,
  getProjectTask,
  updateProjectTask,
})(UpdateProjectTask);
