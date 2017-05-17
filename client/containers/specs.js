import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Col, Thumbnail, MenuItem } from 'react-bootstrap';

class EquipmentSpecs extends Component {
  renderSpecs(eqmtDetails) {
    //console.log('eqmtDetails: ', eqmtDetails)
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
    });

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
    });

    driveType = driveType.map(type => {
      return (
        <MenuItem 
          key={type.name} 
          eventKey={type.name}>{type.name}: <span className="spec-value">{type.value}</span></MenuItem>
      )
    });

    extDimensions = extDimensions.map(ext => {
      return (
        <MenuItem 
          key={ext.name} 
          eventKey={ext.name}>{ext.name}: <span className="spec-value">{ext.value}</span></MenuItem>
      )
    });


    specifications = specStorage.map(specs => {
      // console.log('spces<: ', specs)
      return (
        <MenuItem 
          key={specs.name} 
          eventKey={specs.name}>{specs.name}: <span className="spec-value">{specs.value}</span></MenuItem>
      )
    });

    const cityMpg = mpgCityHwy.Epa_City_Mpg;
    const hwyMpg = mpgCityHwy.Epa_Highway_Mpg;
    const combinedMpg = mpgCityHwy.Epa_Combined_Mpg;
    
    return (
      <Col xs={6} md={4}>
        <Thumbnail>
          <ul className="specs-list">
            <MenuItem header>Header</MenuItem>
            <MenuItem>City {cityMpg}/ Hwy {hwyMpg}/ Avg {combinedMpg}</MenuItem>
            {specifications}
            <MenuItem header>Exterior Dimensions</MenuItem>
            {extDimensions}
            <MenuItem header>Drive Train</MenuItem>
            {driveType}
          </ul>
        </Thumbnail>
      </Col>
    )
  }

  render() {
    const { equipment, submodel } = this.props;
    
    return (
      <div>
        {
          // equipment[0] === undefined ? <div></div> : this.renderSpecs(equipment[0])
          equipment[0] === undefined ? <div></div> : equipment.map(this.renderSpecs)
        }
      </div>
    )
  }
}

const mapStateToProps = ({ equipment, submodel }) => {
  return { equipment, submodel };
}

export default connect(mapStateToProps)(EquipmentSpecs);
