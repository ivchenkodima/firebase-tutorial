import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import FormPage from "./FormPage";
import EditFormPage from "./EditFormPage";
const Home = () => <div>lorem</div>;

const BasicExample = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/add" component={FormPage} />
      <Route path="/:id" component={EditFormPage} />
    </Switch>
  </Router>
);

ReactDOM.render(<BasicExample />, document.getElementById("root"));
registerServiceWorker();
