import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from './SearchBar';
import WeatherList from './WeatherList';
import MessagePlaceholder from '../components/MessagePlaceholder';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isGeo: false
    };
  }

  componentWillMount() {
    this.geolocationSearch();
  }

  geolocationSearch() {

    /**
     * Get user's location, and fetch weather forecast
     */
    let _locationSuccess = function (position) {
      const location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };

      this.setState({ isGeo: true });
      // Fetch weather data
      this.props.fetchWeather(null, location);
    }.bind(this);

    /**
     * Error handling functions
     */
    let _locationError = function (error) {
      this.setState({ isGeo: false });
      switch (error.code) {
        case error.TIMEOUT:
          this.refs['messagePlaceholder'].showError("A timeout occured! Please try again!");
          break;
        case error.POSITION_UNAVAILABLE:
          this.refs['messagePlaceholder'].showError('We can\'t detect your location. Sorry!');
          break;
        case error.PERMISSION_DENIED:
          //console.log('Please enable location services for this to work.');
          break;
        case error.UNKNOWN_ERROR:
          this.refs['messagePlaceholder'].showError('An unknown error occured!');
          break;
      }
    }.bind(this);

    // Does this browser support geolocation?
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(_locationSuccess, _locationError);
    } else {
      this.refs['messagePlaceholder'].showError('Your browser does not support Geolocation.');
    }
  }

  render() {
    const isGeo = this.state.isGeo;
    let componentsToRender;

    if (isGeo) {
      componentsToRender = (
        <WeatherList />
      );
    } else {
      componentsToRender = (
        <div>
          <SearchBar />
          <WeatherList />
        </div>
      );
    }

    return (
      <div className="container">
        <Header />
        {componentsToRender}
        <MessagePlaceholder ref="messagePlaceholder" />
        <Footer />
      </div>
    );
  }
}

App.displayName = 'Application';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
