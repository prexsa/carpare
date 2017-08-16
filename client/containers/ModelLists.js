import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCar, fetchSuggestions, fetchStyleId, fetchSpecs, fetchEquipment } from '../actions/index.js';
import ModelDetails from '../containers/modelDetails.js';
import Suggestions from '../containers/Suggestions.js';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';


const style = {
  style: {
    margin: 12,    
  },
  paperStyle: {
    width: 115,
    margin: 20,
    border: 'none',
    boxShadow: 'none',
    textAlign: 'center',
    display: 'inline-block',
  }, 
  emptyContainer: {
    minWidth: 88,
    height: 90,
  }
}

let selectedYear;
let stateOfCar;
let randomInt;

class ModelLists extends Component {
  constructor(props) {
    super(props);

    this.state = { merge: [] };

    this.handleMerge = this.handleMerge.bind(this);
    this.handleSuggestion = this.handleSuggestion.bind(this);
    this.handleSuggestionStyleId = this.handleSuggestionStyleId.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('nextProps: ', nextProps)
    const { specs, equipments, suggestion, styleId } = nextProps;

    // merge results of specs and equipment, data is received
    // from two different endpoints
    let merge = [];
    if(specs.length === equipments.length) {
      specs.forEach((spec, i) => {
        equipments.forEach((equipment, j) => {
          if(i === j) {
            merge.push([ spec, equipment ]);
          } 
        })
      })
    }

    merge.reverse();

    if(merge.length > 4) return;

    this.setState({ merge });

    if(suggestion.length <= 0) {
      this.handleMerge(merge);
    }else{
      if(styleId.length <= 0) {
        this.handleSuggestion(merge, suggestion);
      }

      this.handleSuggestionStyleId(styleId);
    }

    return true;
  }

  handleMerge(merge) {
    if(merge.length > 0) {
        const vehicleType = {
          category: merge[0][0].categories,
          make: merge[0][0].make,
          model: merge[0][0].model,
          submodel: merge[0][0].submodel
        }
        this.props.fetchSuggestions(vehicleType);
    }
  }

  handleSuggestion(merge, suggest) {
    const year = merge[0][0].year.year;
    const condition = merge[0][0].states[0].toLowerCase();
    const suggestedModel = Object.assign({ year, condition }, suggest[0]);

    this.props.fetchStyleId(suggestedModel);
  }

  handleSuggestionStyleId(styleId) {
    if(styleId.length > 0) {
      let styleIdSug;
      const styleList = styleId[0].styles;
      if(randomInt === undefined) {
        randomInt = Math.floor(styleList.length * Math.random());
        styleIdSug = styleList[randomInt].id;
        this.props.fetchSpecs(styleIdSug);
        this.props.fetchEquipment(styleIdSug);
      }
    }
  }

  handleCarSelect(index){
    let mergeArray = this.state.merge;
    mergeArray.splice(index, 1);
    this.setState({ merge: mergeArray });
  }

  displaystuff() {
    if(this.state.merge.length < 0) return;

    return (
      <Paper style={style.paperStyle}>
        <List style={{ textAlign: 'center' }}>
          <ListItem disabled={true} style={{padding: 0}} ><CardTitle title="MPG" titleStyle={{ fontSize: 17 }}></CardTitle></ListItem>
          <ListItem disabled={true} style={style.emptyContainer}></ListItem>
          <ListItem disabled={true} style={style.emptyContainer}></ListItem>
          <ListItem disabled={true} style={{padding: 0}} ><CardTitle title="0 - 60" subtitle="(seconds)" titleStyle={{ fontSize: 17 }} subtitleStyle={{ fontSize: 14 }} style={{ bottom: 70 }} ></CardTitle></ListItem>
          <ListItem disabled={true} style={{padding: 0}} ><CardTitle title="Horsepower" titleStyle={{ fontSize: 17 }} style={{ bottom: 73 }} ></CardTitle></ListItem>
          <ListItem disabled={true} style={{padding: 0}} ><CardTitle title="Torque" titleStyle={{ fontSize: 17 }} style={{ bottom: 40 }} ></CardTitle></ListItem>
          <ListItem disabled={true} style={{padding: 0}} ><CardTitle title="Wheel Driven" titleStyle={{ fontSize: 17 }} style={{ padding: 0 }}></CardTitle></ListItem>
        </List>
      </Paper> 
    )
  }

  render () {
    return (
      <div>
      {
        this.state.merge.map((details, i) => {
          const id = details[0].id;
          return (
            <ModelDetails
              key={id} 
              detail={details}
              index={i}
              onCarSelect={(idx) => this.handleCarSelect(idx)}
            />
          );
        })
      
      }
      </div>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators({ fetchCar, fetchSuggestions, fetchStyleId, fetchSpecs, fetchEquipment }, dispatch);
}

const mapStateToProps = ({ specs, equipments, photo, suggestion, styleId }) => {
  return { specs, equipments, photo, suggestion, styleId }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelLists);