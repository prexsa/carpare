import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { fetchSpecs, fetchEquipment } from '../actions/index.js';


class ModelStyles extends Component {
  fetchAction(styleId) {
    // console.log("style.id: ", styleId)
    this.props.fetchSpecs(styleId);
    this.props.fetchEquipment(styleId);
  }

  renderSubmodel(submodels) {
    if(submodels === undefined ) return;
    
    // console.log('submodels: ', submodels.years[0].styles)
    const styles = submodels.years[0].styles;
    // console.log('styles: ', styles)
    return(
      <DropdownButton title="Sub-Models" id='submodels'>
        {styles.map(style => {
          return (
            <MenuItem
              key={style.id}
              eventKey={style.id}
              onSelect={() => this.fetchAction(style.id)}
            >{style.name}
            </MenuItem>
          )
        })}
      </DropdownButton>
    )
  }

  render() {
    const { submodel } = this.props;
    // console.log('submodel: ', submodel[0])
    return (
      <div>
        {submodel === undefined ? <div></div> : this.renderSubmodel(submodel[0])}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSpecs, fetchEquipment }, dispatch);
}

const mapStateToProps = ({ submodel }) => {
  return { submodel }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelStyles);