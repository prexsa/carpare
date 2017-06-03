import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEquipment, fetchSpecs } from '../actions/index.js';
import { Col, Thumbnail, MenuItem } from 'react-bootstrap';
import EquipmentDetails from '../containers/equipmentDetails.js';

class Specs extends Component {
  renderDetails(styleDetails) {
    // console.log('vehicle spec: ', styleDetails);
    const styleId = styleDetails.id;
    const cityMpg = styleDetails.MPG.city;
    const hwyMpg = styleDetails.MPG.highway;
    const avgMpg = (parseInt(cityMpg) + parseInt(hwyMpg)) / 2;
    const name = styleDetails.name;
    const make = styleDetails.make.name;
    const modelName = styleDetails.model.name;
    const year = styleDetails.year.year;
    const hrspwr = styleDetails.engine.horsepower;
    const torque = styleDetails.engine.torque;
    const fuelType = styleDetails.engine.fuelType;
    const marketClass = styleDetails.categories.market;
    const epaClass = styleDetails.categories.EPAClass;
    const drivenWheels = styleDetails.drivenWheels.charAt(0).toUpperCase() + styleDetails.drivenWheels.slice(1);
    const invoicePrice = styleDetails.price.baseInvoice;
    const msrpPrice = styleDetails.price.baseMSRP;
    let hrspwrRpm;
    let torqueRpm;
    if(styleDetails.engine.rpm) {
      hrspwrRpm = " @ " + styleDetails.engine.rpm.horsepower + " RPM";
      torqueRpm = " @ " + styleDetails.engine.rpm.torque + " RPM";
    }else{
      hrspwrRpm = " ";
      torqueRpm = " ";
    }


    const title = make + " " + modelName + " " + year;
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
      <Col xs={6} md={4} key={styleId}>
        <Thumbnail>
          <ul className="specs-list">
            <MenuItem header>{title}</MenuItem>
            <MenuItem>{name}</MenuItem>
            <MenuItem>City {cityMpg}/ Hwy {hwyMpg}/ Avg {avgMpg}</MenuItem>
            <MenuItem header>Performance</MenuItem>
            <EquipmentDetails />
            <MenuItem>Horsepower: {hrspwr}{hrspwrRpm}</MenuItem>
            <MenuItem>Torque: {torque}{torqueRpm}</MenuItem>
            <MenuItem>{fuelType}</MenuItem>
            <MenuItem>{drivenWheels}</MenuItem>
            <MenuItem header>Cost</MenuItem>
            <MenuItem>Base MSRP: ${numberWithCommas(msrpPrice)}</MenuItem>
          </ul>
        </Thumbnail>
      </Col>
    )
  }

  render() {
    const { specs } = this.props;

    return (
      <div>
        {
          // equipment[0] === undefined ? <div></div> : this.renderSpecs(equipment[0])
          specs[0] === undefined ? <div></div> : specs.map(this.renderDetails)
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEquipment, fetchSpecs }, dispatch);
}

const mapStateToProps = ({ specs }) => {
  return { specs };
}

export default connect(mapStateToProps, mapDispatchToProps)(Specs);