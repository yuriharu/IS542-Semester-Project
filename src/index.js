/***********  REACT ***********************************/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

/***********  COMPONENT *******************************/
import Analysis from "./analysis.js";
import Home from "./home.js";
import ItemInput from "./input.js";
import MenuBar from "./navbar.js";
import Setting from "./setting.js";
import "./styles/index.css";

const baseUrl = "/IS542-Semester-Project";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuBar />
      <div id="container">
        <Switch>
          <Route exact path={baseUrl + "/input"}><ItemInput /></Route>
          <Route exact path={baseUrl + "/setting"}><Setting /></Route>
          <Route exact path={baseUrl + "/analysis"}><Analysis /></Route>
          <Route exact path={baseUrl + "/"}><Home /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
