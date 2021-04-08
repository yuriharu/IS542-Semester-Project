import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Home from './home';
import ItemInput from './input';
import MenuBar from './navbar';
import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuBar />
      <div className="container">
        <Switch>
          <Route exact path="/input"><ItemInput /></Route>
          <Route exact path="/"><Home /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
