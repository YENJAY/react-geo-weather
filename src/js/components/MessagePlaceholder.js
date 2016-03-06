import React, { Component } from 'react';

export default class MessagePlaceholder extends Component {

  showError(error) {
    this.refs.errorPlaceholder.innerHTML = error;
  }

  render() {
    return (
      <div className="weather__message" ref="errorPlaceholder"></div>
    );
  }
}

MessagePlaceholder.displayName = 'MessagePlaceholder';
