import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModelDetails from '../containers/modelDetails.js';

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

    //console.log('merge: ', merge)

    return (
      <div>
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

const mapStateToProps = ({ specs, equipments }) => {
  return { specs, equipments }
}

export default connect(mapStateToProps)(ModelLists);