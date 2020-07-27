import React, { Component } from "react";
import Proptypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      startDate: "",
      endDate: "",
      errors: {},
      errorIdentifier: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    this.props.createProject(newProject, this.props.history);
  };
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
      this.setState({ errorIdentifier: this.state.projectIdentifier });
    }
  }
  render() {
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Create Project
                </h5>
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
                      className={`${
                        this.state.errors.projectIdentifier &&
                        this.state.projectIdentifier ===
                          this.state.errorIdentifier
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }`}
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      value={this.state.projectIdentifier}
                      onChange={this.onChange}
                    />
                    <div className="invalid-feedback">
                      {this.state.errors.projectIdentifier}
                    </div>
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
                      value={this.state.description}
                      onChange={this.onChange}
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

AddProject.propTypes = {
  createProject: Proptypes.func.isRequired,
  errors: Proptypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(AddProject);
