import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

const style = {
  style: {
    margin: 12,    
  },
  paperStyle: {
    width: 230,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  }
}


const modelDetails = ({ detail }) => {
   console.log("details: ", detail)
    const specs = detail[0];
    const equipmentArray = detail[1].equipment;
  // console.log('equipment: ', equipmentArray)

    const styleId = specs.id;
    const name = specs.name;
    const make = specs.make.name;
    const modelName = specs.model.name;
    const year = specs.year.year;
    const hrspwr = specs.engine.horsepower || 'n/a';
    const torque = specs.engine.torque || 'n/a';
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
    // console.log('specifications: ', specifications)
    specifications.filter((specName, i) => {
      const specNameArray = specName.name.split(' ');
      if( specNameArray[0] === 'Curb' ||
          specNameArray[0] === 'Tco' ||
          specNameArray[0] === 'Turning' ||
          specNameArray[0] === 'Fuel' ||
          specNameArray[0] === 'Manufacturer' ||
          specNameArray[0] === 'Epa' ||
          specNameArray[0] === 'Ege'
        )
      {
        //specStorage.push(specName);
        if(specNameArray[0] === 'Manufacturer') { 
          //specName.name = 'Manufacturer_0_60mph'; 
          specStorage['Manufacturer_0_60mph'] = specName.value;
        }
        specStorage[specName.name.split(' ').join("_")] = specName.value
      }
    });
/*
console.log('extDimensions: ', extDimensions)
    extDimensions = extDimensions.map(ext => {
      return (
        <MenuItem 
          key={ext.name} 
          eventKey={ext.name}>{ext.name}: <span className="spec-value">{ext.value}"</span></MenuItem>
      )
    });
    */
// console.log('specStorage: ', specStorage)
    const curbWeight = specStorage.Curb_Weight || specStorage.Tco_Curb_Weight;
    const fuelCapacity = specStorage.Fuel_Capacity;
    const zeroToSixty = specStorage.Manufacturer_0_60mph || 'n/a';
    const cityMpg = specStorage.Epa_City_Mpg || specStorage.Epa_City_Mpge ||  specStorage.Ege_City_Mpg || 'n/a';
    const hwyMpg = specStorage.Epa_Highway_Mpg || specStorage.Epa_Highway_Mpge || specStorage.Ege_Highway_Mpg || 'n/a';
    const combinedMpg = specStorage.Epa_Combined_Mpg || specStorage.Epa_Combined_Mpge || specStorage.Ege_Combined_Mpg || 'n/a';

  return (
    <Paper key={styleId} style={style.paperStyle}>
      <List style={{ textAlign: 'center' }}>
        <ListItem disabled={true}>
          MSRP $
          <RaisedButton label={numberWithCommas(msrpPrice)} disabled={true} disabledLabelColor='black' style={style.style} />
        </ListItem>
        <ListItem disabled={true}>
          <RaisedButton label={combinedMpg} />
          <ul className="mpg-list" style={{ display: 'flex' }}>
            <li><CardTitle title={cityMpg} subtitle="City"  titleStyle={{ fontSize: 14 }} subtitleStyle={{ fontSize: 11 }} /></li>
            <li><CardTitle title={hwyMpg} subtitle="Highway"  titleStyle={{ fontSize: 14 }} subtitleStyle={{ fontSize: 11 }} /></li>
          </ul>
        </ListItem>
        <ListItem disabled={true}>
          <RaisedButton label={zeroToSixty} style={style.style} />
        </ListItem>
        <ListItem disabled={true}>
          <RaisedButton label={hrspwr} style={style.style} />
          <br />
          <span className="sub-list-item">{hrspwrRpm}</span>
        </ListItem>
        <ListItem disabled={true}>
          <RaisedButton label={torque} style={style.style} />
          <br />
          <span className="sub-list-item">{torqueRpm}</span>
        </ListItem>
        <ListItem disabled={true}>
          <RaisedButton label={drivenWheels} style={style.style} />
        </ListItem>
      </List>
    </Paper>
  )
}

export default modelDetails;

// https://api.edmunds.com/api/vehicle/v2/styles/401662176?view=full&fmt=json&api_key=7y4d6pwpy5h3g2gyn8sp2k5u