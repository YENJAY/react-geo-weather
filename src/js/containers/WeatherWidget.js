import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeatherIcon from '../components/WeatherIcon';

const UNICODE_MINUS = '\u2212';

function formatNumber(number) {
  return String(Math.round(number)).replace(/^\-/, UNICODE_MINUS);
}

class WeatherWidget extends Component {

  renderWeatherWidget(cityData) {

    if (cityData.cod === 200) {
      // Extract required data
      const city = cityData.name;
      const country = cityData.sys.country || '';
      const tempMin = formatNumber(cityData.main.temp_min);
      const tempMax = formatNumber(cityData.main.temp_max);
      const condition = cityData.weather[0].main;

      return (
        <div key={cityData.id}>
          <div className="weather-widget">
            <div className="weather-widget__main">
              <WeatherIcon icon={cityData.weather[0].icon.replace(/[dn]$/, '')} />
            </div>
            <div className="weather-widget__footer">
              <p className="weather-widget__data">{condition} <b>{tempMin}°c / {tempMax}°c</b></p>
            </div>
          </div>
          <p className="weather-widget__location">{city}, <b>{country}</b></p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.props.weather.map(this.renderWeatherWidget)}
      </div>
    );
  }
}

WeatherWidget.displayName = 'WeatherWidget';

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherWidget);
