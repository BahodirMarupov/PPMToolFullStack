import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddProject from "./components/project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import updateProject from "./components/project/updateProject";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={updateProject} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
