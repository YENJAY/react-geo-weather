import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import GMap from '../components/GMap';
import WeatherIcon from '../components/WeatherIcon';

class WeatherList extends Component {

  renderWeather(cityData) {
    if (cityData.cod === '404') {
      return (
        <tr key={cityData.cod}>
          <td className="error" colSpan="5">City not found</td>
        </tr>
      );
    }

    const temps = cityData.list.map((weather) => { return weather.main.temp; });
    const pressures = cityData.list.map((weather) => { return weather.main.pressure; });
    const humidities = cityData.list.map((weather) => { return weather.main.humidity; });
    const { lon: lng, lat } = cityData.city.coord;

    return (
      <tr key={cityData.city.id}>
        <td><GMap lng={lng} lat={lat} /></td>
          <td>
            <Chart data={temps} color="red" unit="°" />
          </td>
          <td>
            <Chart data={pressures} color="green" unit=" hPa" />
          </td>
          <td>
            <Chart data={humidities} color="blue" unit="%" />
          </td>
          <td>
            <WeatherIcon icon={cityData.list[0].weather[0].icon.replace(/[dn]$/, '')} />
          </td>
      </tr>
    );
  }

  render() {
    let weather = this.props.weather;
    let widgets;

    if (!weather.length) {
      widgets = (
        <div className="placeholder">Add the first location above ↑</div>
      );
    } else {
      widgets = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (°C)</th>
              <th>Pressure (hPa)</th>
              <th>Humidity (%)</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {weather.map(this.renderWeather)}
          </tbody>
        </table>
      );
    }
    return (
      <div>{widgets}</div>
    );
  }
}

WeatherList.displayName = 'WeatherList';

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
