import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';


const BUTTONS = ['Select Make', 'Select Model', 'Select Year'];


const renderDropdownButton = (title, i) => {
  return (
    <DropdownButton bsStyle="default" title={title} key={i} id={`dropdown-basic-${i}`}>
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3" active>Active Item</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
  )
}

const renderMakeList = (makes) => {
  console.log('makes: ', makes)
  return (
    <DropdownButton bsStyle="default" title={title} key={i} id={`dropdown-basic-${i}`}>
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3" active>Active Item</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
  )
}


const DropDownList = (make) => {
console.log('make: ', make[0]);
const makes = make[0];
  return (
    <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
  )
}

export default DropDownList;