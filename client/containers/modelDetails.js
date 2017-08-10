import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

const style = {
  style: {
    margin: 12,
    fontSize: 24,
    paddingBottom: 2,
    marginBottom: 2
  },
  paperStyle: {
    width: 230,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  imgSize: {
    height: 200
  },
  icon: {
    bottom: 5,
    left: 95
  }
}

const modelDetails = ({ index, detail, onCarSelect }) => {
    const specs = detail[0];
    const equipmentArray = detail[1].equipment;
    const styleId = specs.id;
    const name = specs.name;
    const make = specs.make.name;
    const makeName = specs.make.name;
    const submodelName = specs.submodel.modelName;
    const year = specs.year.year;
    const hrspwr = specs.engine.horsepower || 'n/a';
    const torque = specs.engine.torque || 'n/a';
    const fuelType = specs.engine.fuelType;
    const marketClass = specs.categories.market;
    const epaClass = specs.categories.EPAClass;
    let drivenWheels = specs.drivenWheels.split(" ");
    drivenWheels = drivenWheels[0].toUpperCase();
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

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
          specNameArray[0] === 'Tco' ||
          specNameArray[0] === 'Turning' ||
          specNameArray[0] === 'Fuel' ||
          specNameArray[0] === 'Manufacturer' ||
          specNameArray[0] === 'Epa' ||
          specNameArray[0] === 'Ege'
        )
      {
        if(specNameArray[0] === 'Manufacturer') { 
          specStorage['Manufacturer_0_60mph'] = specName.value;
        }
        specStorage[specName.name.split(' ').join("_")] = specName.value
      }
    });

    const curbWeight = specStorage.Curb_Weight || specStorage.Tco_Curb_Weight;
    const fuelCapacity = specStorage.Fuel_Capacity;
    const zeroToSixty = specStorage.Manufacturer_0_60mph || 'n/a';
    const cityMpg = specStorage.Epa_City_Mpg || specStorage.Epa_City_Mpge ||  specStorage.Ege_City_Mpg || 'n/a';
    const hwyMpg = specStorage.Epa_Highway_Mpg || specStorage.Epa_Highway_Mpge || specStorage.Ege_Highway_Mpg || 'n/a';
    const combinedMpg = specStorage.Epa_Combined_Mpg || specStorage.Epa_Combined_Mpge || specStorage.Ege_Combined_Mpg || 'n/a';

  return (
    <Paper key={styleId} style={style.paperStyle}>
      <Card>
        <IconButton style={style.icon} onClick={() => onCarSelect(index)} >
          <NavigationClose />
        </IconButton>
        <CardMedia overlay={ <CardTitle title={makeName} subtitle={submodelName} style={{padding: 2}} /> } >
          <img src="" style={style.imgSize} />
        </CardMedia>
      </Card>
      <List style={{ textAlign: 'center' }}>
        <ListItem disabled={true}>
          MSRP $
          <RaisedButton label={numberWithCommas(msrpPrice)} disabled={true} disabledLabelColor='black' style={style.style} />
        </ListItem>
        <ListItem disabled={true}>
          <CardTitle title={combinedMpg} subtitle="Combined" titleStyle={{ fontSize: 24 }} subtitleStyle={{ fontSize: 14 }} />
          <ul className="mpg-list" style={{ display: 'flex' }}>
            <li><CardTitle title={cityMpg} subtitle="City"  titleStyle={{ fontSize: 14 }} subtitleStyle={{ fontSize: 11 }} /></li>
            <li><CardTitle title={hwyMpg} subtitle="Highway"  titleStyle={{ fontSize: 14 }} subtitleStyle={{ fontSize: 11 }} /></li>
          </ul>
        </ListItem>
        <ListItem disabled={true}>
          <CardText style={style.style}>{zeroToSixty}</CardText>
        </ListItem>
        <ListItem disabled={true}>
          <CardText style={style.style}>{hrspwr}</CardText>
          <span className="sub-list-item">{hrspwrRpm}</span>
        </ListItem>
        <ListItem disabled={true}>
          <CardText style={style.style}>{torque}</CardText>
          <span className="sub-list-item">{torqueRpm}</span>
        </ListItem>
        <ListItem disabled={true}>
          <CardText style={style.style}>{drivenWheels}</CardText>
        </ListItem>
      </List>
    </Paper>
  )
}

export default modelDetails;

// https://api.edmunds.com/api/vehicle/v2/styles/401662176?view=full&fmt=json&api_key=