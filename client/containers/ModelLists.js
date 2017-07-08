import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSuggestions } from '../actions/index.js';
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

class ModelLists extends Component {
  render () {
    const { specs, equipments, photo } = this.props;
console.log('photo: ', photo);
    // merge result of specs && equipment into grouped 
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

    console.log('merge: ', merge);
    if(merge.length > 0) {

      const vehicleType = {
        category: merge[0][0].categories,
        make: merge[0][0].make,
        model: merge[0][0].model,
        submodel: merge[0][0].submodel
      }
      
      this.props.fetchSuggestions(vehicleType);
    }

    //console.log('market: ', market)


    return (
      <div>
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
      {
        merge.map(details => {
          const id = details[0].id;
          return <ModelDetails key={id} detail={details} />
        })
      }
      </div>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators({ fetchSuggestions }, dispatch);
}

const mapStateToProps = ({ specs, equipments, photo }) => {
  return { specs, equipments, photo }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelLists);