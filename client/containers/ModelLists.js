import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSuggestions } from '../actions/index.js';
import ModelDetails from '../containers/modelDetails.js';
import Suggestions from '../containers/Suggestions.js';


class ModelLists extends Component {
  render () {
    const { specs, equipments } = this.props;

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

    //console.log('merge: ', merge);
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
      {
        merge.map(details => {
          const id = details[0].id;
          return <ModelDetails key={id} detail={details} />
        })
      }
      <Suggestions />
      </div>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators({ fetchSuggestions }, dispatch);
}

const mapStateToProps = ({ specs, equipments }) => {
  return { specs, equipments }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelLists);