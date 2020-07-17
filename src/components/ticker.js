import React, { Component } from 'react';
import { url as ALPHA_VANTAGE_URL } from '../utils/url';

export default class Ticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: {},
      currentValue: [],
      symbol: 'SCHB',
      key: '',
      isLoaded: false,
      error: null,
    };

    this.getSingleQuote = this.getSingleQuote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  fetchQuote(symbol) {
    return `${ALPHA_VANTAGE_URL}${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;
  }

  getSingleQuote() {
    fetch(this.fetchQuote('IBM'))
      .then((res) => res.json())
      .then(
        (result) => {
          let formattedResult = JSON.parse(
            JSON.stringify(Object.values(result)[0])
          );

          Object.entries(formattedResult).forEach((key, value) =>
            this.setState({
              currentValue: { key },
              ticker: formattedResult,
              isLoaded: true,
            })
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  tickerExists() {
    return this.isLoaded;
  }

  renderTicker() {
    return (
      <h3>
        {this.tickerExists
          ? Object.values(this.state.currentValue)
          : 'No Ticker Selected'}
      </h3>
    );
  }

  renderInput() {
    return (
      <div>
        <input placeholder='Enter Symbol'></input>
      </div>
    );
  }

  onSubmit() {}

  render() {
    return (
      <div>
        {this.renderInput()}
        <br></br>
        <button onClick={this.getSingleQuote}>Enter</button>
        <div>{this.renderTicker()}</div>
      </div>
    );
  }
}
