import logo from "./logo.svg";
import "./index.css";
import Todo from "./Todo";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/todo">
            <Todo />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
export default App;
