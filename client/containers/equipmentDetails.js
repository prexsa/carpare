import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEquipment, fetchSpecs } from '../actions/index.js';
import { Col, Thumbnail, MenuItem } from 'react-bootstrap';

class EquipmentDetails extends Component {
  renderEquipment(eqmtDetails) {
    if(eqmtDetails.equipment === undefined) { return; }
    const equipments = eqmtDetails.equipment;

    const eqpmntStorage = {};
    const specStorage = [];
    const curbWeight = specStorage.Curb_Weight;
    const fuelCapacity = specStorage.Fuel_Capacity;
    const zeroToSixty = specStorage.Manufacturer_0_60mph;
    let extDimensions = eqpmntStorage.Exterior_Dimensions;
    let specifications = eqpmntStorage.Specifications;

    equipments.filter(name => {
      if( name.name === 'Exterior Dimensions' ||
          name.name === 'Specifications'
        ) {
        eqpmntStorage[name.name.split(" ").join("_")] = name.attributes;
      }
    });

    // filter for for hwy, city, combined, curb weight, 0-60, fuel-capacity,
    specifications.filter((specName, i) => {
      const specNameArray = specName.name.split(' ');
      if( specNameArray[0] === 'Curb' ||
          specNameArray[0] === 'Turning' ||
          specNameArray[0] === 'Fuel' ||
          specNameArray[0] === 'Manufacturer'
        )
      {
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