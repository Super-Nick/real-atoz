import React from "react";
import { Route } from "react-router-dom";
import Main from "./Main";
import Game from "./Game";
import Rank from "./Rank";
import Rule from "./Rule";
import "./App.css";

function App() {
  return (
    <div>
      <Route path="/" component={Main} exact={true} />
      <Route path="/Game" component={Game} />
      <Route path="/Rank" component={Rank} />
      <Route path="/Rule" component={Rule} />
    </div>
  );
}

export default App;
