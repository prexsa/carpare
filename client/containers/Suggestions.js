import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSpecs, fetchEquipment, fetchPhoto, fetchStyleId } from '../actions/index.js';

let randomInt;
class Suggestions extends Component {
  componentWillReceiveProps() {
    const merge = this.props.merge;
    const { suggestion, styleId } = this.props;
  }

  render() {
    const suggestedModel = Object.assign(stateYear, suggestion[0]);

    if(styleId === undefined || styleId.length == 0) {
      this.props.fetchStyleId(suggestedModel);
    }

    if(styleId.length > 0) {
      let styleIdSug;
      const styleList = styleId[0].styles;
      
      if(randomInt === undefined) {
        randomInt = Math.floor(styleList.length * Math.random());
        styleIdSug = styleList[randomInt].id;
        this.props.fetchSpecs(styleIdSug);
        this.props.fetchEquipment(styleIdSug);
        this.props.fetchPhoto(styleIdSug);
      }
    }
  // https://api.edmunds.com/api/vehicle/v2/honda/civic/2013?view=full&fmt=json&api_key=7y4d6pwpy5h3g2gyn8sp2k5u
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