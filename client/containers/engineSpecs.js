import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, DropdownButton, FormGroup, MenuItem, Radio } from 'react-bootstrap';

class equipmentSpecs extends Component {

  renderSpecs(eqmtDetails) {
    if(eqmtDetails.equipment === undefined) { return; }
    //console.log('equipment: ', eqmtDetails.equipment);
    const equipments = eqmtDetails.equipment;

    const eqpmntStorage = {};
    const specStorage = [];
    const mpgCityHwy = {};

    equipments.filter(name => {
      if( name.name === 'Exterior Dimensions' ||
          name.name === 'Specifications' ||
          name.name === 'Drive Type'
        ) {
        eqpmntStorage[name.name.split(" ").join("_")] = name.attributes;
      }
    })

    let driveType = eqpmntStorage.Drive_Type;
    let extDimensions = eqpmntStorage.Exterior_Dimensions;
    let specifications = eqpmntStorage.Specifications;

    // filter for for hwy, city, combined, curb weight, 0-60, fuel-capacity,
    specifications.filter((specName, i) => {
      const specNameArray = specName.name.split(' ');
      if( specNameArray[0] === 'Epa' || 
          specNameArray[0] === 'Curb' ||
          specNameArray[0] === 'Turning' ||
          specNameArray[0] === 'Fuel' ||
          specNameArray[0] === 'Manufacturer'
        )
      {
        // specStorage[specNameArray.join("_")] = specName;
        if(specNameArray[0] === 'Epa') {
          mpgCityHwy[specNameArray.join("_")] = specName.value;
        }else{
          specStorage.push(specName);        
        }
      }
    })

    driveType = driveType.map(type => {
      return (
        <MenuItem key={type.name} eventKey={type.name}>{type.name}: {type.value}</MenuItem>
      )
    });

    extDimensions = extDimensions.map(ext => {
      return (
        <MenuItem key={ext.name} eventKey={ext.name}>{ext.name}: {ext.value}</MenuItem>
      )
    });


    specifications = specStorage.map(specs => {
      // console.log('spces<: ', specs)
      return (
        <MenuItem key={specs.name} eventKey={specs.name}>{specs.name}: {specs.value}</MenuItem>
      )
    });

    const cityMpg = mpgCityHwy.Epa_City_Mpg;
    const hwyMpg = mpgCityHwy.Epa_Highway_Mpg;
    const combinedMpg = mpgCityHwy.Epa_Combined_Mpg;
    
    return (
      <ul>
        <MenuItem header>Header</MenuItem>
        <MenuItem>City {cityMpg}/ Hwy {hwyMpg}/ Combined {combinedMpg}</MenuItem>
        {specifications}
        {extDimensions}
        {driveType}
      </ul>
    )
  }

  render() {
    const { equipment } = this.props;
    return (
      <div>
        {equipment[0] === undefined ? <div></div> : this.renderSpecs(equipment[0])}
      </div>
    )
  }
}

const mapStateToProps = ({ equipment }) => {
  return { equipment };
}

export default connect(mapStateToProps)(equipmentSpecs);