import React from 'react';

export default class Table extends React.Component {
  renderTableData = () => {
    return this.props.value.map((attrs) => {
      const {
        symbol,
        open,
        high,
        low,
        price,
        volume,
        latest,
        previous,
        change,
      } = attrs;
      return (
        <tr key={symbol}>
          <td>{symbol}</td>
          <td>{open}</td>
          <td>{high}</td>
          <td>{low}</td>
          <td>{price}</td>
          <td>{volume}</td>
          <td>{latest}</td>
          <td>{previous}</td>
          <td>{change}</td>
        </tr>
      );
    });
  };

  renderTableHeader = () => {
    let header = Object.keys(this.props.value[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  render() {
    console.log(this.props.value);
    return (
      <div>
        <h1 id='title'>{this.props.value[0]['symbol']}</h1>
        <table id='students'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
