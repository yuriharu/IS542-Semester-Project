/***********  REACT ***********************************/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

/***********  COMPONENT *******************************/
import Home from "./home.js";
import ItemInput from "./input.js";
import MenuBar from "./navbar.js";
import Setting from "./setting.js";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuBar />
      <div id="container">
        <Switch>
          <Route exact path="/input"><ItemInput /></Route>
          <Route exact path="/setting"><Setting /></Route>
          <Route exact path="/"><Home /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
