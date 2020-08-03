import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProject, createProject } from "../../actions/projectActions";

class UpdateProject extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      description: "",
      startDate: "",
      endDate: "",
      errors: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let newProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    this.props.createProject(newProject, this.props.history);
  };
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    if (!this.state.errors) {
      const {
        id,
        projectName,
        projectIdentifier,
        description,
        startDate,
        endDate,
      } = newProps.project;
      this.setState({
        id,
        projectName,
        projectIdentifier,
        description,
        startDate,
        endDate,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Edit Project</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`${
                        this.state.errors.projectName &&
                        this.state.projectName === ""
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }`}
                      placeholder="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                    <div className="invalid-feedback">
                      {this.state.errors.projectName}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg disabled"
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      onChange={this.onChange}
                      disabled
                      value={this.state.projectIdentifier}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className={`${
                        this.state.errors.description &&
                        this.state.description === ""
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }`}
                      placeholder="Project Description"
                      name="description"
                      onChange={this.onChange}
                      value={this.state.description}
                    ></textarea>
                    <div className="invalid-feedback">
                      {this.state.errors.description}
                    </div>
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="startDate"
                      onChange={this.onChange}
                      value={this.state.startDate}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="endDate"
                      onChange={this.onChange}
                      value={this.state.endDate}
                    />
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

const mapStateToProps = (state) => ({
  project: state.projects.project,
  errors: state.errors,
});

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
