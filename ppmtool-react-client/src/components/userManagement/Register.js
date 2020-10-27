import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createNewUser } from '../../actions/securityActions'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            errors: {},
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({
                errors: newProps.errors
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let newUser = {
            fullName: this.state.name,
            username: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.createNewUser(newUser, this.props.history);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`${this.state.errors.fullName && this.state.name === "" ?
                                        "form-control form-control-lg is-invalid" : "form-control form-control-lg"}`} placeholder="Full name" name="name"
                                        value={this.state.name} onChange={this.onChange} />
                                    <div className="invalid-feedback">{this.state.errors.fullName}</div>
                                </div>
                                <div className="form-group">
                                    <input type="email" className={`${this.state.errors.username&&this.state.email==="" ?
                                        "form-control form-control-lg is-invalid" : "form-control form-control-lg"}`} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                                    <div className="invalid-feedback">{this.state.errors.username}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`${(this.state.errors.password&&this.state.password==="")||
                                    (this.state.errors.password&&this.state.password.length<6)?
                                        "form-control form-control-lg is-invalid" : "form-control form-control-lg"}`} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                    <div className="invalid-feedback">{this.state.errors.password}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`${this.state.errors.confirmPassword&&this.state.password!==this.state.confirmPassword?
                                        "form-control form-control-lg is-invalid" : "form-control form-control-lg"}`} placeholder="Confirm Password"
                                        name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} />
                                    <div className="invalid-feedback">{this.state.errors.confirmPassword}</div>
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})


export default connect(mapStateToProps, { createNewUser })(Register);