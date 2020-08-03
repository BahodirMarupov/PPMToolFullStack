import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProjectTask } from "../../../actions/projectTaskActions";
import { getProject } from "../../../actions/projectActions";

class AddProjectTask extends Component {
  constructor() {
    super();
    this.state = {
      summary: "",
      acceptanceCriteria: "",
      dueDate: "",
      priority: "",
      errors: {},
    };
  }

  componentDidMount(){
    this.props.getProject(this.props.match.params.id)
  }

  onSubmit = (e) => {
    e.preventDefault();
    let newProjecTask={
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      dueDate: this.state.dueDate,
      priority: this.state.priority
    }
    this.props.addProjectTask(this.props.match.params.id,newProjecTask,this.props.history)
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(newProps){
    if (newProps.errors) {
    this.setState({errors:newProps.errors})
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
                <h4 className="display-4 text-center">Add Project Task</h4>
                <p className="lead text-center">{this.props.project.projectName} {this.props.project.projectIdentifier}</p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`${this.state.errors.summary&&this.state.summary===""?"form-control form-control-lg is-invalid":"form-control form-control-lg"}`}
                      name="summary"
                      placeholder="Project Task summary"
                      value={this.state.summary}
                      onChange={this.onChange}
                    />
                    <div className="invalid-feedback">{this.state.errors.summary}</div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Acceptance Criteria"
                      name="acceptanceCriteria"
                      value={this.state.acceptanceCriteria}
                      onChange={this.onChange}
                    ></textarea>
                  </div>
                  <h6>Due Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="dueDate"
                      value={this.state.dueDate}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="priority"
                      value={this.state.priority}
                      onChange={this.onChange}
                    >
                      <option value={0}>Select Priority</option>
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
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

AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  project:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  project: state.projects.project
});

export default connect(mapStateToProps, { addProjectTask,getProject })(AddProjectTask);
