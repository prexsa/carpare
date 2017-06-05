import React, { Component } from 'react';
import { Col, Thumbnail, MenuItem } from 'react-bootstrap';

const modelDetails = ({ detail }) => {
   console.log("details: ", detail)
    const specs = detail[0];
    const equipmentArray = detail[1].equipment;
  // console.log('equipment: ', equipmentArray)

    const styleId = specs.id;
    const cityMpg = specs.MPG.city;
    const hwyMpg = specs.MPG.highway;
    const avgMpg = (parseInt(cityMpg) + parseInt(hwyMpg)) / 2;
    const name = specs.name;
    const make = specs.make.name;
    const modelName = specs.model.name;
    const year = specs.year.year;
    const hrspwr = specs.engine.horsepower;
    const torque = specs.engine.torque;
    const fuelType = specs.engine.fuelType;
    const marketClass = specs.categories.market;
    const epaClass = specs.categories.EPAClass;
    const drivenWheels = specs.drivenWheels.charAt(0).toUpperCase() + specs.drivenWheels.slice(1);
    const invoicePrice = specs.price.baseInvoice;
    const msrpPrice = specs.price.baseMSRP;
    let hrspwrRpm;
    let torqueRpm;

    if(specs.engine.rpm) {
      hrspwrRpm = " @ " + specs.engine.rpm.horsepower + " RPM";
      torqueRpm = " @ " + specs.engine.rpm.torque + " RPM";
    }else{
      hrspwrRpm = " ";
      torqueRpm = " ";
    }

    const title = make + " " + modelName + " " + year;
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // equipment 

    const eqpmntStorage = {};
    const specStorage = [];

    equipmentArray.filter(name => {
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
          specNameArray[0] === 'Manufacturer_0_60mph'
        )
      {
        //specStorage.push(specName);
        if(specNameArray[0] === 'Manufacturer') { specName.name = 'Manufacturer_0_60mph'; }
        specStorage[specName.name.split(' ').join("_")] = specName.value
      }
    });

// console.log('specifications: ', specifications)
    extDimensions = extDimensions.map(ext => {
      return (
        <MenuItem 
          key={ext.name} 
          eventKey={ext.name}>{ext.name}: <span className="spec-value">{ext.value}"</span></MenuItem>
      )
    });

// console.log('specStorage: ', specStorage)
    const curbWeight = specStorage.Curb_Weight;
    const fuelCapacity = specStorage.Fuel_Capacity;
    const zeroToSixty = specStorage.Manufacturer_0_60mph;

  return (
    <div>
      <Col xs={6} md={4} key={styleId}>
        <Thumbnail>
          <ul className="specs-list">
            <MenuItem header>{title}</MenuItem>
            <MenuItem>{name}</MenuItem>
            <MenuItem>City {cityMpg}/ Hwy {hwyMpg}/ Avg {avgMpg}</MenuItem>
            <MenuItem header>Performance</MenuItem>
            <MenuItem>0 - 60: {zeroToSixty} (seconds)</MenuItem>
            <MenuItem>Horsepower: {hrspwr}{hrspwrRpm}</MenuItem>
            <MenuItem>Torque: {torque}{torqueRpm}</MenuItem>
            <MenuItem>Curb Weight: {curbWeight} lbs</MenuItem>
            <MenuItem>{fuelType}</MenuItem>
            <MenuItem>{drivenWheels}</MenuItem>
            <MenuItem header>Exterior Dimensions</MenuItem>
            {extDimensions}
            <MenuItem header>Cost</MenuItem>
            <MenuItem>Base MSRP: ${numberWithCommas(msrpPrice)}</MenuItem>
          </ul>
        </Thumbnail>
      </Col>
    </div>
  )
}

export default modelDetails;