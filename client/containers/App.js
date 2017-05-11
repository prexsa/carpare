import React, { Component } from 'react';
import { FormGroup, Radio } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>Hello World, I'm App
      <div className="header">
        <h1><strong>Car-Pare</strong></h1>
      </div>
      <div className="selection-container">
        <FormGroup>
          <Radio name="radioGroup" inline>
            New
          </Radio>
          {' '}
          <Radio name="radioGroup" inline>
            Used
          </Radio>
        </FormGroup>
      </div>
      <div className="sub-selection-container">
        
      </div>
      <div className="main-container"></div>
      </div>
    )
  }




}

export default App;