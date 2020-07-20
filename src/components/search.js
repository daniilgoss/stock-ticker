import React, { Component } from 'react';
import Table from './shared/table';
import { searchQuote, singleQuote } from '../utils/end-points';
import { formatSingleQuote } from '../utils/formatters';
import SearchField from 'react-search-field';
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
      isSearching: false,
    };
  }

  onEnterChange = () => {
    if (this.state.value.length === 0) return;
    fetch(singleQuote(this.state.value))
      .then((response) => {
        return response.json();
      })
      .then((parsedJson) => {
        // if (JSON.stringify(parsedJson) === '{"Global Quote":{}}')
        //   this.setState({
        //     // error: true,
        //     // ticker: { invalidValue: this.state.value },
        //     // isSearching: false,
        //   });
        // else {

        this.setState({
          ticker: {
            validValue: formatSingleQuote(parsedJson),
          },
          isSearching: false,
          isLoaded: true,
        });
      });
  };

  search = () => {
    // console.log(this.state.value);
    fetch(searchQuote(this.state.value))
      .then((response) => {
        return response.json();
      })
      .then((parsedJson) => {
        // console.log(4, Object.keys(parsedJson)[0]);
        // if (Object.keys(parsedJson)[0] === 'Error Message')
        //   this.setState({
        //     error: true,
        //   });
        // else {
        //   console.log(1, parsedJson);
        //   this.setState({
        //     error: false,
        //     isLoaded: true,
        //     ticker: parsedJson,
        //   });
        // }
        this.setState({
          ticker: { searchResults: parsedJson },
          isSearching: true,
        });
      });
  };

  onSearchChange = (event) => {
    this.setState({ value: event });
    this.search();
  };

  //   renderInvalidSelection = () => {
  //     return <h5>"{this.state.value}" did not yield any search results</h5>;
  //   };

  renderTicker = () => {
    return (
      <h6>
        {this.state.isLoaded ? (
          <Table value={this.state.ticker.validValue} />
        ) : (
          ''
        )}
      </h6>
    );
  };

  renderSearchResults = () => {
    return (
      <h6>
        {this.state.isSearching
          ? JSON.stringify(this.state.ticker.searchResults)
          : ''}
      </h6>
    );
  };

  render() {
    console.log(this.state.value);
    return (
      <div id='quote'>
        <SearchField
          placeholder='Search for a Symbol'
          onChange={(this.state.value, this.onSearchChange)}
          onEnter={(this.state.value, this.onEnterChange)}
          onSearchClick={this.onEnterChange}
          classNames='test-class'
        />
        {this.renderSearchResults()}
        {this.renderTicker()}
      </div>
    );
  }
}
