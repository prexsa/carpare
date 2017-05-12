import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCondition } from '../actions/index.js';
import { DropdownButton, FormGroup, MenuItem, Radio } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderDropDownList = this.renderDropDownList.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.fetchCondition(e.target.value);
  }

  renderMakesDropDownList(makes) {
    return (
      <DropdownButton title='Makes' id='makes'>
        {makes.map(make => {
          console.log('make: ', make)
          return (<MenuItem key={make.id} eventKey={make.id}>{make.name}</MenuItem>)
        })}
      </DropdownButton>
    )
  }

  renderModelsDropDownList() {
    return (
      <DropdownButton>
        
      </DropdownButton>
    )
  }


  render() {
    const { condition } = this.props;

    return (
      <div>Hello World, I'm App
      <div className="header">
        <h1><strong>Car-Pare</strong></h1>
      </div>
      <div className="selection-container">
        <FormGroup onChange={this.handleChange}>
          <Radio name="radioGroup" value="new" inline>
            New
          </Radio>
          {' '}
          <Radio name="radioGroup" value='used' inline>
            Used
          </Radio>
        </FormGroup>
      </div>
      <div className="sub-selection-container">
        {condition[0] === undefined ? <div></div> : this.renderMakesDropDownList(condition[0])}
      </div>
      <div className="main-container"></div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchCondition }, dispatch);
}

const mapStateToProps = ({ condition }) => {
  return { condition };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);