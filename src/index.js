import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Form from "./Form";

const Home = () => <div>lorem</div>;

const BasicExample = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route exact path="/form" component={Form} />
  </Router>
);

ReactDOM.render(<BasicExample />, document.getElementById("root"));
registerServiceWorker();
