import React, { Component } from 'react';
import { url as ALPHA_VANTAGE_URL } from '../utils/url';
import Header from './header';

export default class Ticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: {},
      value: '',
      isLoaded: false,
      error: false,
    };

    this.getSingleQuote = this.getSingleQuote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  format(json) {
    let buffer = [];

    Object.keys(json).forEach((key) => {
      buffer.push(json[key]);
    });

    buffer.map((item) => {
      Object.keys(item).map((key) => {
        const newProp = key.split(' ')[1];
        item[newProp] = item[key];
        delete item[key];
      });
    });

    return buffer[0];
  }

  fetchQuote(symbol) {
    return `${ALPHA_VANTAGE_URL}${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;
  }

  getSingleQuote(event) {
    fetch(this.fetchQuote(this.state.value))
      .then((response) => {
        return response.json();
      })
      .then((parsedJson) => {
        if (JSON.stringify(parsedJson) === '{"Global Quote":{}}')
          this.setState({
            error: true,
            ticker: { invalidValue: this.state.value },
          });
        else {
          this.setState({
            ticker: { validValue: this.format(parsedJson) },
            isLoaded: true,
            error: false,
          });
        }
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  renderInvalidSelection() {
    return (
      <h5>
        "{this.state.ticker.invalidValue}" is not a valid selection. Please
        enter a valid ticker and try again
      </h5>
    );
  }

  tickerExists() {
    return this.state.isLoaded;
  }

  renderTicker() {
    return (
      <h6>
        {this.tickerExists()
          ? JSON.stringify(Object.entries(this.state.ticker.validValue))
          : 'No Ticker Selected'}
      </h6>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.getSingleQuote}>
          <label>
            Generate a Quote
            <br></br>
            <br></br>
            <input
              placeholder='Enter Symbol'
              type='text'
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
          </label>
        </form>
        {this.state.error ? this.renderInvalidSelection() : this.renderTicker()}
      </div>
    );
  }
}
