import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSpecs, fetchEquipment, fetchPhoto, fetchStyleId } from '../actions/index.js';

class Suggestions extends Component {
  render() {
    console.log('props: ', this.props);
    const stateYear = this.props.stateYear;
    const { suggestion, styleId } = this.props;
    Object.assign(stateYear, suggestion[0]);
console.log('stateYear: ', stateYear);
  this.props.fetchStyleId(stateYear);
  // Start here! Need to add actions for fetchSuggestionStyleId

  //console.log('suggestion styleId: ', styleId)
  
  // https://api.edmunds.com/api/vehicle/v2/honda/civic/2013?view=full&fmt=json&api_key=7y4d6pwpy5h3g2gyn8sp2k5u
    // this.props.fetchSpecs(styleId);
    // this.props.fetchEquipment(styleId);
    // this.props.fetchPhoto(styleId);


    return (
      <div>
        Hello world, I'm Suggestions
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSpecs, fetchEquipment, fetchPhoto, fetchStyleId }, dispatch);
}

const mapStateToProps = ({ suggestion, styleId }) => {
  return { suggestion, styleId }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);