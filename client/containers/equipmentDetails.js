import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEquipment, fetchSpecs } from '../actions/index.js';
import { Col, Thumbnail, MenuItem } from 'react-bootstrap';

class EquipmentDetails extends Component {
  renderEquipment(eqmtDetails) {
    //console.log('eqmtDetails: ', eqmtDetails)
    if(eqmtDetails.equipment === undefined) { return; }
    //console.log('equipment: ', eqmtDetails.equipment);
    const equipments = eqmtDetails.equipment;

    const eqpmntStorage = {};
    const specStorage = [];

    equipments.filter(name => {
      if( name.name === 'Exterior Dimensions' ||
          name.name === 'Specifications'
        ) {
        eqpmntStorage[name.name.split(" ").join("_")] = name.attributes;
      }
    });

    let extDimensions = eqpmntStorage.Exterior_Dimensions;
    let specifications = eqpmntStorage.Specifications;
    // filter for for hwy, city, combined, curb weight, 0-60, fuel-capacity,
    specifications.filter((specName, i) => {
      const specNameArray = specName.name.split(' ');
      if( specNameArray[0] === 'Curb' ||
          specNameArray[0] === 'Turning' ||
          specNameArray[0] === 'Fuel' ||
          specNameArray[0] === 'Manufacturer'
        )
      {
        //specStorage.push(specName);
        if(specNameArray[0] === 'Manufacturer') { specName.name = 'Manufacturer_0_60mph'; }
        specStorage[specName.name.split(' ').join("_")] = specName.value
      }
    });

    extDimensions = extDimensions.map(ext => {
      return (
        <MenuItem 
          key={ext.name} 
          eventKey={ext.name}>{ext.name}: <span className="spec-value">{ext.value}</span></MenuItem>
      )
    });

// console.log('specStorage: ', specStorage)
    const curbWeight = specStorage.Curb_Weight;
    const fuelCapacity = specStorage.Fuel_Capacity;
    const zeroToSixty = specStorage.Manufacturer_0_60mph;

    return (
      <div>
        <MenuItem>Zero To Sixty: {zeroToSixty} (seconds)</MenuItem>
        <MenuItem>Curb Weight: {curbWeight}</MenuItem>
        <MenuItem header>Exterior Dimensions</MenuItem>
        {extDimensions}
      </div>
    )
  }


  render() {
    const { equipments } = this.props;
    //console.log('equipment: ', equipment)
    return (
      <div>
        {
          equipments[0] === undefined ? <div></div> : this.renderEquipment(equipments[0])
        }

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEquipment, fetchSpecs }, dispatch);
}

const mapStateToProps = ({ equipments }) => {
  return { equipments };
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentDetails);


/*
  renderEquipment(eqmtDetails) {
    console.log('eqmtDetails: ', eqmtDetails)
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
*/