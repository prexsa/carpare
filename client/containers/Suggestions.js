import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSuggestions } from '../actions/index.js';


class Suggestions extends Component {
  render() {

    const { suggestion } = this.props;
console.log('suggestion: ', suggestion)
    return (
      <div>
        Hello world, I'm Suggestions
      </div>
    )
  }
}

const mapStateToProps = ({ suggestion }) => {
  return { suggestion }
}

export default connect(mapStateToProps)(Suggestions);