import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/securityActions'
import PropTypes from 'prop-types'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            errors: {},
            email: "",
            password: ""
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newLogin = {
            username: this.state.email,
            password: this.state.password
        }
        this.props.login(newLogin);
    }

    componentDidMount(){
        if(this.props.security.validToken){
            this.props.history.push("/dashboard")
        }
    }

    componentWillReceiveProps(newProps) {

        if(newProps.security.validToken){
            this.props.history.push("/dashboard")
        }

        if (newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }

    getError = (invalid) => {
        if(invalid){
            return (
                <div className="pb-3 pt-3">
                    <div className="alert alert-danger text-center w-50 m-auto" role="alert">{invalid}</div>
                </div>
            )
        }

    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            {this.getError(this.state.errors.invalid)}
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`${this.state.errors.username && this.state.email === "" ?
                                        "form-control form-control-lg is-invalid" : "form-control form-control-lg"}`} placeholder="Email Address" name="email" value={this.state.email}
                                        onChange={this.onChange} />
                                    <div className="invalid-feedback">{this.state.errors.username}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`${this.state.errors.password && this.state.password === "" ?
                                        "form-control form-control-lg is-invalid" : "form-control form-control-lg"}`} placeholder="Password" name="password" value={this.state.password}
                                        onChange={this.onChange} />
                                    <div className="invalid-feedback">{this.state.errors.password}</div>
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    security:state.security
})


export default connect(mapStateToProps, { login })(Login);