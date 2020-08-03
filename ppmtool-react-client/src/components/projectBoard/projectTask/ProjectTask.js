import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../actions/projectTaskActions";

export class ProjectTask extends Component {
  deleteBtn = () => {
    this.props.deleteProjectTask(
      this.props.id,
      this.props.projectTask.projectSequence
    );
  };

  render() {

    let renderSwitch = (priority) => {
      switch (priority) {
        case 1:
          return "HIGH";
        case 2:
          return "MEDIUM";
        case 3:
          return "LOW";
  
        default:
          break;
      }
    };

    let setBgColor=(priority)=>{
switch (priority) {
  case 1:
    
    return "bg-danger card-header text-white";
  case 2:
    
    return "bg-warning card-header text-white";
  case 3:
    
    return "bg-info card-header text-white";

  default:
    break;
}
    }
    return (
      <div>
        <div className="card mb-1">
          <div className={`${setBgColor(this.props.projectTask.priority)}`}>
            ID: {this.props.projectTask.projectSequence} -- Priority:{" "}
            {renderSwitch(this.props.projectTask.priority)}
          </div>
          <div className="card-body bg-light">
            <h5 className="card-title">{this.props.projectTask.summary}</h5>
            <p className="card-text text-truncate ">
              {this.props.projectTask.acceptanceCriteria}
            </p>
            <Link
              to={`/updateProjectTask/${this.props.id}/${this.props.projectTask.projectSequence}`}
              className="btn btn-primary"
            >
              View / Update
            </Link>

            <button
              type="button"
              className="btn btn-danger ml-4"
              onClick={this.deleteBtn}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteProjectTask })(ProjectTask);
