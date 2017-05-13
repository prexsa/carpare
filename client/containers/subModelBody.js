import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class SubModelBody extends Component {

  renderSubmodel(submodels) {
    if(submodels === undefined ) return;
    
    console.log('submodels: ', submodels.years[0].styles)
    const styles = submodels.years[0].styles;
    console.log('styles: ', styles)
    return(
      <DropdownButton title="Sub-Models" id='submodels'>
        {styles.map(style => {
          return (
            <MenuItem
              key={style.id}
              eventKey={style.id}
            >{style.name}
            </MenuItem>
          )
        })}
      </DropdownButton>
    )
  }
  render() {
    const { submodel } = this.props;
    console.log('submodel: ', submodel[0])
    return (
      <div>Hello World, I'm SubModelBody
        {submodel === undefined ? <div></div> : this.renderSubmodel(submodel[0])}
      </div>
    )
  }
}

const mapStateToProps = ({ submodel }) => {
  return { submodel }
}

export default connect(mapStateToProps)(SubModelBody);