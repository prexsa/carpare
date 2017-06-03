import React, { Component } from 'react';
import { Col, Thumbnail, MenuItem } from 'react-bootstrap';

const modelDetails = ({ detail }) => {
  console.log("details: ", detail)
    const specs = detail[0];
    const equipment = detail[1];


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

  return (
    <div>
      Hello World, I'm modelDetails
      <Col xs={6} md={4} key={styleId}>
        <Thumbnail>
          <ul className="specs-list">
            <MenuItem header>{title}</MenuItem>
            <MenuItem>{name}</MenuItem>
            <MenuItem>City {cityMpg}/ Hwy {hwyMpg}/ Avg {avgMpg}</MenuItem>
            <MenuItem header>Performance</MenuItem>
            <MenuItem>Horsepower: {hrspwr}{hrspwrRpm}</MenuItem>
            <MenuItem>Torque: {torque}{torqueRpm}</MenuItem>
            <MenuItem>{fuelType}</MenuItem>
            <MenuItem>{drivenWheels}</MenuItem>
            <MenuItem header>Cost</MenuItem>
            <MenuItem>Base MSRP: ${numberWithCommas(msrpPrice)}</MenuItem>
          </ul>
        </Thumbnail>
      </Col>
    </div>
  )
}

export default modelDetails;