import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { fetchSpecs, fetchEquipment, fetchPhoto } from '../actions/index.js';

const sorting = (a, b) => {
  const carA = a.name.toUpperCase();
  const carB = b.name.toUpperCase();

  let comparison = 0;
  if(carA > carB) {
    comparison = 1;
  }else if(carA < carB) {
    comparison = -1;
  }
  return comparison;
}

class ModelStyles extends Component {
  constructor(props) {
    super(props);

    this.state = { submodelValue: ''}
  }

  fetchAction(styleId, styleName) {
    this.props.fetchSpecs(styleId);
    this.props.fetchEquipment(styleId);
    this.props.fetchPhoto(styleId);
    this.setState.submodelValue = styleName;
  }

  renderSubmodel(submodels) {
    if(submodels === undefined ) return;
    
    const styles = submodels.years[0].styles;

    styles.sort(sorting);

    return (

    )

    return(
      <SelectField 
        value={this.state.submodelValue} 
        hintText="SubModels" 
        hintStyle={{ left: 20 }}
        style={{width: 200}}
      >
        {styles.map(style => {
          return (
            <MenuItem
              key={style.id}
              value={style.id}
              primaryText={style.name}
              onTouchTap={() => this.fetchAction(style.id, style.trim)}
            >
            </MenuItem>
          )
        })}
      </SelectField>
    )
  }

  render() {
    const { submodel } = this.props;
    return (
      <div className="submodel-dropdown">
        {submodel === undefined ? <div>
          <SelectField 
            hintText="SubModels"
            hintStyle={{ left: 20 }} 
            style={{width: 200}}
            disabled={true}
          />
        </div> : this.renderSubmodel(submodel[0])}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSpecs, fetchEquipment, fetchPhoto }, dispatch);
}

const mapStateToProps = ({ submodel }) => {
  return { submodel }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelStyles);
