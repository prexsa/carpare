import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCondition, fetchCar } from '../actions/index.js';
import { ButtonToolbar, DropdownButton, FormGroup, MenuItem, Radio } from 'react-bootstrap';

class DropDownList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.renderMakes = this.renderMakes.bind(this);
    this.renderModels = this.renderModels.bind(this);

    this.state = {
      condition: '',
      modelSelected: '',
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
    // console.log('year: ', year)
    // console.log('state : ', this.state);
    this.props.fetchCar(this.state, year);
  }

  renderMakes(allMakes) {
    // console.log("DropDownList makes: ", allMakes)
    // const makes = allMakes;
    return (
      <DropdownButton title='Makes' id='makes'>
        {allMakes.map(make => {
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
                onSelect={() => this.setState({ years: [model.years], modelNiceName: model.niceName, modelSelected: model.name })}
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
                onSelect={() => {
                  this.setState({ yearSelected: year });
                  this.onSelectYear(year.year);
                }}
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
    //console.log('condition: ', condition)
    const { models, years } = this.state;

    return (
      <div>
        Hello World, I"m DropDownList
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

        {condition[0] === undefined ? <div></div> : this.renderMakes(condition[0])}
        {models === [] ? <div></div> : this.renderModels(models)}
        {years === [] ? <div></div> : this.renderYears(years)}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchCondition, fetchCar }, dispatch);
}

const mapStateToProps = ({ condition }) => {
  return { condition }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownList);