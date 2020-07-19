import React, { Component } from 'react';
import Header from './shared/header';
// import Table from './shared/table';
import singleQuote from '../utils/url';
import format from '../utils/formatters';

export default class SingleQuote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: {},
      value: '',
      isLoaded: false,
      error: false,
    };
  }

  getSingleQuote = (event) => {
    fetch(singleQuote(this.state.value))
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
            ticker: { validValue: format(parsedJson) },
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

  tickerExists() {
    return this.state.isLoaded;
  }

  renderInvalidSelection() {
    return (
      <h5>
        "{this.state.ticker.invalidValue}" is not a valid selection. Please
        enter a valid ticker and try again
      </h5>
    );
  }

  renderTicker() {
    return (
      <h6>
        {this.tickerExists()
          ? JSON.stringify(this.state.ticker.validValue)
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
        {/* <Table /> */}
      </div>
    );
  }
}
