import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { DropdownButton, MenuItem } from 'react-bootstrap';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { fetchSpecs, fetchEquipment, fetchPhoto } from '../actions/index.js';


class ModelStyles extends Component {
  constructor(props) {
    super(props);

    this.state = { submodelValue: ''}
  }

  fetchAction(styleId, styleName) {
    console.log("style.id: ", styleId)
    //this.setState.submodelValue = styleName;
    this.props.fetchSpecs(styleId);
    this.props.fetchEquipment(styleId);
    this.props.fetchPhoto(styleId);
  }

  renderSubmodel(submodels) {
    if(submodels === undefined ) return;
    
    // console.log('submodels: ', submodels.years[0].styles)
    const styles = submodels.years[0].styles;
    // console.log('styles: ', styles)
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
              onTouchTap={() => this.fetchAction(style.id, style.name)}
            >
            </MenuItem>
          )
        })}
      </SelectField>
    )
  }

  render() {
    const { submodel } = this.props;
    // console.log('submodel: ', submodel[0])
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