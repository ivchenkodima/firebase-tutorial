import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FormPage from "./FormPage";
const Home = () => <div>lorem</div>;

const BasicExample = () => (
  <Router>
    <Route exact path="/" component={FormPage} />
    <Route path="/home" component={Home} />
  </Router>
);

ReactDOM.render(<BasicExample />, document.getElementById("root"));
registerServiceWorker();
