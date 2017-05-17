import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, DropdownButton, FormGroup, MenuItem, Radio } from 'react-bootstrap';
import DropDownList from '../components/dropdownlist.js';
import ModelStyles from '../containers/ModelStyles.js';
import Specs from '../containers/specs.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
  }

  componentWillUpdate(){
    // this.setState({ list: this.props.equipment })
    console.log('constructor state: ', this.state);
  }

  renderList() {
    console.log('im renderList ', this.props.equipment)
  }

  render() {
const { equipment } = this.props;
// console.log('equipment: app ', equipment)
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
          <Specs />
          <Specs />
          { equipment[0] === undefined ? <div>Oh yeah!</div> : this.renderList()}
      </div>
    )
  }
}


const mapStateToProps = ({ equipment }) => {
  return { equipment };
}

export default connect(mapStateToProps)(App);
