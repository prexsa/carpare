import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCondition, fetchCar } from '../actions/index.js';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
    marginRight: 15,
    width: 'auto'
  },
  radioGroup: {
    display: 'flex',
    marginRight: 3,
    marginLeft: 3
  }
};


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
      makeValue: '',
      modelValue: '',
      yearValue: ''
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
      <div>
        <SelectField 
          value={this.state.makeValue} 
          hintText="Make" 
          hintStyle={{ left: 20 }}
          style={{width: 200}}
          >
          {allMakes.map(make => {
            //console.log('make: ', make)
            return (
              <MenuItem 
                key={make.id}
                value={make.name}
                primaryText={make.name}
                onTouchTap={() => this.setState({ models: [make.models] , makeNiceName: make.niceName, makeValue: make.name})}
              >
              </MenuItem>)
          })}
        </SelectField>
      </div>
    )
  }

  renderModels(models) {
    //console.log("models: ", models[0])
    if(models[0] === undefined) return;
    return (
      <div>
        <SelectField 
          value={this.state.modelValue} 
          hintText="Model"
          hintStyle={{ left: 20 }}
          style={{width: 200}}
          >
          {
            models[0].map(model => {
              return (
                <MenuItem 
                  key={model.name}
                  value={model.name}
                  primaryText={model.name}
                  onTouchTap={() => this.setState({ years: [model.years], modelNiceName: model.niceName, modelSelected: model.name, modelValue: model.name })}
                  >
                </MenuItem>
              )
            })
          }
        </SelectField>
      </div>
    )
  }

  renderYears(years) {
    if(years[0] === undefined) return;
    return (
      <div>
        <SelectField 
          value={this.state.yearValue} 
          hintText="Year"
          hintStyle={{ left: 20 }} 
          style={{width: 200}}
          >
          {
            years[0].map(year => {
              return (
                <MenuItem
                  key={year.id}
                  value={year.year}
                  primaryText={year.year}
                  onTouchTap={() => {
                    this.setState({ yearSelected: year, yearValue: year.year });
                    this.onSelectYear(year.year);
                  }}
                >
                </MenuItem>
              )
            })
          }
        </SelectField>
      </div>
    )
  }

  render() {
    const { condition } = this.props;
    //console.log('condition: ', condition)
    const { models, years } = this.state;
//console.log('models: ', models, " years: ", years)
    return (
      <div>
        <div className="condition-container">
          <RadioButtonGroup name="condition" onChange={this.handleChange} style={styles.radioGroup}>
            <RadioButton
              value="new"
              label="New"
              style={styles.radioButton}
              iconStyle={{ marginRight: 5 }}
            />
            <RadioButton
              value="used"
              label="Used"
              style={styles.radioButton}
              iconStyle={{ marginRight: 5 }}
            />
          </RadioButtonGroup>
        </div>
        <div>
          <ul className="selection-container" style={{ display: 'flex' }}>
            <li>{
              condition[0] === undefined ? <div>
              <SelectField 
                hintText="Make"
                hintStyle={{ left: 20 }} 
                style={{width: 200}}
                disabled={true}
              />
            </div> : this.renderMakes(condition[0])}</li>
            <li>{models[0] === undefined ? <div>
              <SelectField 
                hintText="Model"
                hintStyle={{ left: 20 }} 
                style={{width: 200}}
                disabled={true}
              />
            </div> : this.renderModels(models)}</li>
            <li>{years[0] === undefined ? <div>
              <SelectField 
                hintText="Year"
                hintStyle={{ left: 20 }} 
                style={{width: 200}}
                disabled={true}
              />
            </div> : this.renderYears(years)}</li>
          </ul>
        </div>
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