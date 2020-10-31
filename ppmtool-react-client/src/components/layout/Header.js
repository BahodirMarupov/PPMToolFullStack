import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from "../../actions/securityActions";

class Header extends Component {

  logout=()=>{
    this.props.logout();
    window.location.href="/"
  }

  signUpChecking = (security) => {

    const { user, validToken } = security
    const fullName = user.fullName;

    if (validToken) {
      return (<Link className="nav-link" to="/dashboard">
        <i class="fas fa-user-circle mr-1"></i>
        {fullName}
      </Link>
      )

    }

    else {
      return (<Link className="nav-link " to="/register">
        Sign Up
      </Link>)
    }
  }

  signInChecking = (security) => {

    if (security.validToken) {
      return (
        <Link className="nav-link bg-red" onClick={this.logout}>
          Logout
        </Link>
      )
    }

    return (
      <Link className="nav-link" to="/login">
        Login
      </Link>
    )
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Personal Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {this.signUpChecking(this.props.security)}
              </li>
              <li className="nav-item">
                {this.signInChecking(this.props.security)}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  security: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  security: state.security
})

export default connect(mapStateToProps, { logout })(Header);
