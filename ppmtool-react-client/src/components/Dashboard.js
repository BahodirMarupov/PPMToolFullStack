import React, { Component } from "react";
import ProjectItem from "./project/ProjectItem";
import CreateProjectButton from "./project/CreateProjectButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjects, clearErrors } from "../actions/projectActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
    this.props.clearErrors();
  }

  render() {
    return (
      <div>
        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                <CreateProjectButton />
                <br />
                <hr />
                {this.props.projects.map((element) => (
                  <ProjectItem
                    project={element}
                    key={element.projectIdentifier}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  projects: PropTypes.array.isRequired,
  getProjects: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects.allProjects,
});

export default connect(mapStateToProps, { getProjects, clearErrors })(
  Dashboard
);
