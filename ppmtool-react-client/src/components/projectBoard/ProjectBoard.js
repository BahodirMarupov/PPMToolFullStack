import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBacklog } from "../../actions/projectTaskActions";
import { Link } from "react-router-dom";
import ProjectTask from "./projectTask/ProjectTask";

class ProjectBoard extends Component {
  componentDidMount() {
    this.props.getBacklog(this.props.match.params.id);
  }

  getBacklog = (projectTasks, id) => {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-secondary text-white">
              <h3>TO DO</h3>
            </div>
            {projectTasks
              .filter((element) => element.status === "TO_DO")
              .map((element) => (
                <ProjectTask
                  key={element.peojectSequense}
                  projectTask={element}
                  id={id}
                />
              ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-primary text-white">
              <h3>In Progress</h3>
            </div>
            {projectTasks
              .filter((element) => element.status === "IN_PROGRESS")
              .map((element) => (
                <ProjectTask
                  key={element.peojectSequense}
                  projectTask={element}
                  id={id}
                />
              ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-success text-white">
              <h3>Done</h3>
            </div>
            {projectTasks
              .filter((element) => element.status === "DONE")
              .sort((a, b) => a.priority - b.priority)
              .map((element) => (
                <ProjectTask
                  key={element.peojectSequense}
                  projectTask={element}
                  id={id}
                />
              ))}
          </div>
        </div>
      </div>
    );
  };

  getContent = (errors, getBacklog, projectTasks) => {
    if (projectTasks.length === 0) {
      if (errors.projectNotFound) {
        return (
          <div
            className="alert alert-danger text-danger text-center font-weight-bold"
            role="alert"
          >
            {this.props.errors.projectNotFound}
          </div>
        );
      } else {
        return (
          <div
            className="alert alert-info text-dark text-center font-weight-bold"
            role="alert"
          >
            No project task on this board
          </div>
        );
      }
    } else {
      return getBacklog;
    }
  };
  render() {
    return (
      <div>
        <div className="container">
          <Link
            to={`/addProjectTask/${this.props.match.params.id}`}
            className="btn btn-primary mb-3"
          >
            <i className="fas fa-plus-circle"> Create Project Task</i>
          </Link>
          <br />
          <hr />

          <div className="container">
            {this.getContent(
              this.props.errors,
              this.getBacklog(
                this.props.projectTasks,
                this.props.match.params.id
              ),
              this.props.projectTasks
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  projectTasks: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projectTasks: state.backlog.project_tasks,
  errors: state.errors,
});
export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
