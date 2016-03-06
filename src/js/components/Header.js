import React from 'react';
import moment from 'moment';

export default function Header(props) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdays[moment().weekday()];
  const date = moment().format('MMM D');

  return (
    <header className="header">{weekday}, {date}</header>
  );
}
