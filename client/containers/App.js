import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCondition, fetchCar } from '../actions/index.js';
import { ButtonToolbar, DropdownButton, FormGroup, MenuItem, Radio } from 'react-bootstrap';
import DropDownList from '../components/dropdownlist.js';
import SubModelBody from '../containers/subModelBody.js';
import EngineSpecs from '../containers/engineSpecs.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderMakes = this.renderMakes.bind(this);
    this.renderModels = this.renderModels.bind(this);
    this.renderYears = this.renderYears.bind(this);
    this.state = {
      condition: '',
      models: [],
      years: [],
      makeNiceName: '',
      modelNiceName: '',
      yearSelected: 0,
    }
  }

  handleChange(e) {
    this.setState({ condition: e.target.value });
    this.props.fetchCondition(e.target.value);
  }

  onSelectYear(year) {
    //console.log('year: ', year)
    //console.log('state : ', this.state);
    this.props.fetchCar(this.state, year);
  }

  renderMakes(makes) {
    // console.log("makes: ", makes)
    return (
      <DropdownButton title='Makes' id='makes'>
        {makes.map(make => {
          //console.log('make: ', make)
          return (
            <MenuItem 
              key={make.id} 
              eventKey={make.id} 
              onSelect={() => this.setState({ models: [make.models] , makeNiceName: make.niceName})}
              >{make.name}
            </MenuItem>)
        })}
      </DropdownButton>
    )
  }


  renderModels(models) {
    //console.log("models: ", models[0])
    if(models[0] === undefined) return;
    return (
      <DropdownButton title="Models" id="models">
        {
          models[0].map(model => {
            return (
              <MenuItem 
                key={model.name}
                eventKey={model.name}
                onSelect={() => this.setState({ years: [model.years], modelNiceName: model.niceName })}
                >{model.name}
              </MenuItem>
            )
          })
        }
      </DropdownButton>
    )
  }

  renderYears(years) {
    if(years[0] === undefined) return;
    return (
      <DropdownButton title="Years" id="years">
        {
          years[0].map(year => {
            return (
              <MenuItem
                key={year.id}
                eventKey={year.id}
                onSelect={() => this.onSelectYear(year.year)}
              >{year.year}
              </MenuItem>
            )
          })
        }
      </DropdownButton>
    )
  }


  render() {
    const { condition } = this.props;
    const { models, years } = this.state;

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
          {condition[0] === undefined ? <div></div> : this.renderMakes(condition[0])}
          {models === [] ? <div></div> : this.renderModels(models)}
          {years === [] ? <div></div> : this.renderYears(years)}
        </div>
        <div className="submodel-container">
          <SubModelBody />
        </div>
        <div className="main-container"></div>
        <EngineSpecs />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchCondition, fetchCar }, dispatch);
}

const mapStateToProps = ({ condition }) => {
  return { condition };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);