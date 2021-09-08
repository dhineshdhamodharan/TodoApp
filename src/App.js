import React from "react";
import Todolist from "./todolist";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import { Redirect } from "react-router";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/todolist">
          <Todolist />
        </Route>
      </Switch>
      <Switch>
        <Route path="/login">
          <Login />
          <Redirect from="/" to="login" />
        </Route>
      </Switch>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
