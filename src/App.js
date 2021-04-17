import React, { Component } from "react";
import Appdetik from './Appdetik';
import Appgoal from './Appgoal';
import Bolacom from './Bolacom';
import Pandit from './Pandit';

import "./App.css";

class App extends Component {

  render() {
    return (
      <div>
      <Appdetik/>
      <Bolacom/>
      <Pandit/>
      <Appgoal/>
      </div>
    );
  }
}

export default App;