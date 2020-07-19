import React, { Component } from 'react';
import Table from './shared/table';
import { searchQuote } from '../utils/end-points';
import { formatSingleQuote } from '../utils/formatters';
import '../table.css';
import '../single-quote.css';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: {},
      value: '',
      isLoaded: false,
      error: false,
    };
  }

  search = (event) => {
    console.log(this.state.value);
    fetch(searchQuote(this.state.value))
      .then((response) => {
        return response.json();
      })
      .then((parsedJson) => {
        console.log(4, Object.keys(parsedJson)[0]);
        if (Object.keys(parsedJson)[0] === 'Error Message')
          this.setState({
            ticker: { invalidValue: this.state.value },
            // error: true,
            // isLoaded: false,
          });
        else {
          console.log(1, parsedJson);
          this.setState({
            ticker: parsedJson,
            // error: false,
            isLoaded: true,
          });
        }
      });
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.search(event);
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
          : this.state.value}
      </h6>
    );
  };

  render() {
    console.log(this.state.value);
    return (
      <div id='quote'>
        {/* <Header /> */}
        {/* <form onSubmit={this.search}> */}
        <form>
          <label>
            <h2>Search for a Quote</h2>
            <input
              placeholder='Enter Symbol'
              type='text'
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
          </label>
        </form>
        {this.state.ticker.invalidValue
          ? this.renderInvalidSelection()
          : this.renderTicker()}
      </div>
    );
  }
}
