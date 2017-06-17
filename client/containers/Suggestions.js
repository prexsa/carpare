import React, { Component } from 'react';
import { connect } from 'react-redux';

class Suggestions extends Component {
  render() {
    return (
      <div>
        Hello world, I'm Suggestions
      </div>
    )
  }
}


export default connect()(Suggestions);