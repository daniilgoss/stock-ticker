import React, { Component } from 'react';
import Table from './shared/table';
import { timeSeriesQuote } from '../utils/end-points';
import { formatTimeSeries } from '../utils/formatters';
// import '../table.css';
import '../single-quote.css';

export default class TimeSeries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: {},
      value: '',
      isLoaded: false,
      error: false,
    };
  }

  getQuote = (event) => {
    fetch(timeSeriesQuote(this.state.value, 'full'))
      .then((response) => {
        return response.json();
      })
      .then((parsedJson) => {
        console.log(1, parsedJson);
        if (JSON.stringify(parsedJson) === '{"Global Quote":{}}')
          this.setState({
            error: true,
            ticker: { invalidValue: this.state.value },
          });
        else {
          this.setState({
            // ticker: { validValue: format(parsedJson) },
            ticker: parsedJson,
            isLoaded: true,
            error: false,
          });
        }
      });
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  tickerExists = () => {
    return this.state.isLoaded;
  };

  renderInvalidSelection = () => {
    return (
      <h5>
        "{this.state.ticker.invalidValue}" is not a valid selection. Please
        enter a valid ticker and try again
      </h5>
    );
  };

  renderTicker = () => {
    return (
      <h6>
        {this.tickerExists()
          ? JSON.stringify(this.state.ticker)
          : 'No Ticker Selected'}
      </h6>
    );
  };

  render() {
    return (
      <div id='quote'>
        <form onSubmit={this.getQuote}>
          <label>
            <h2>Generate a Quote</h2>
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
