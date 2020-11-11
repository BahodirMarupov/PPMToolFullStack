import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddProject from "./components/project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTask from "./components/projectBoard/projectTask/AddProjectTask";
import UpdateProjectTask from "./components/projectBoard/projectTask/UpdateProjectTask";
import Landing from "./components/layout/Landing";
import Login from "./components/userManagement/Login";
import Register from "./components/userManagement/Register";
import jwt_decode from 'jwt-decode'
import setJWToken from "./utils/setJWToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import Footer from "./components/layout/Footer";
import 'react-app-polyfill/stable'

const token = localStorage.jwtToken;

if (token) {
  setJWToken(token);
  const decoded = jwt_decode(token)
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })

  const currentTime = Date.now() / 1000;

  if (currentTime > decoded.exp) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={UpdateProject} />
          <Route exact path="/projectBoard/:id" component={ProjectBoard} />
          <Route exact path="/addProjectTask/:id/" component={AddProjectTask} />
          <Route exact path="/updateProjectTask/:id/:task_id" component={UpdateProjectTask} />
          <Footer/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;