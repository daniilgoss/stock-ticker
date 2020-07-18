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
            ticker: parsedJson,
            isLoaded: true,
            error: false,
          });
        }
      });
    event.preventDefault(); // prevents a refresh from occuring when onSubmit gets fired
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
      <h3>
        {this.tickerExists()
          ? JSON.stringify(this.state.ticker)
          : 'No Ticker Selected'}
      </h3>
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
