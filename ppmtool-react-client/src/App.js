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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={UpdateProject} />
          <Route exact path="/projectBoard/:id" component={ProjectBoard}/>
          <Route exact path="/addProjectTask/:id/" component={AddProjectTask}/>
          <Route exact path="/updateProjectTask/:id/:task_id" component={UpdateProjectTask}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
