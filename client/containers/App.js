import React, { Component } from 'react';
import DropDownList from '../components/dropdownlist.js';
import ModelStyles from '../containers/ModelStyles.js';
import Specs from '../containers/specs.js';

class App extends Component {

  render() {
    return (
      <div>
        <div className="header">
          <h1><strong>Car-Pare</strong></h1>
        </div>
        <div className="sub-selection-container">
          <DropDownList />
        </div>
        <div className="submodel-container">
          <ModelStyles />
        </div>
        <div className="main-container"></div>
          <Specs />
      </div>
    )
  }
}


export default App;