import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    // Context bindings
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit= this.onFormSubmit.bind(this);
  }

  onInputChange(evt) {
    var value = evt.target.value;
    this.setState({ term: value });
  }

  onFormSubmit(evt) {
    evt.preventDefault();

    // Fetch weather data
    this.props.fetchWeather(this.state.term);

    // Clear the field
    this.setState({ term: '' });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input type="text" placeholder="Get a 5 day forecast in your favourite cities"
          className="form-control"
          value={this.state.term}
          autoFocus
          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Add</button>
        </span>
      </form>
    );
  }
}

SearchBar.displayName = 'SearchBar';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
