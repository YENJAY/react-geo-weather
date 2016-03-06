import React from 'react';

export default function WeatherIcon(props) {
  return (
    <img className="weather-icon" src={`icons/sw-${props.icon}.svg`} alt="" />
  );
}
