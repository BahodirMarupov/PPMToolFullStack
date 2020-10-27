import React, { Component } from 'react'
import {Link} from "react-router-dom"

class Landing extends Component {
    render() {
        return (
            <div className="landing">
            <div className="light-overlay landing-inner text-dark">
                <div className="container">
                <button className="btn btn-primary" >Button</button>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Personal Project Management Tool</h1>
                            <p className="lead">
                                Create your account to join active projects or start you own
                            </p>
                            <hr />
                                <Link className="btn btn-primary mr-2 btn-lg" to="/register">Sign Up</Link>
                                <Link className="btn-lg btn btn-secondary mr-2" to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Landing;