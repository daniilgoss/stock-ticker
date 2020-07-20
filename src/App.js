import React from 'react';
import './App.css';
import SingleQuote from './components/single-quote';
import Search from './components/search';
// import TimeSeries from './components/time-series';

function App() {
  return (
    <div className='App-header'>
      <SingleQuote />
      <Search />
      {/* <TimeSeries /> */}
    </div>
  );
}

export default App;
