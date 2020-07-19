const url = (quoteType, symbol) =>
  `https://www.alphavantage.co/query?function=${quoteType}&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

const singleQuote = (symbol) => {
  return url('GLOBAL_QUOTE', symbol);
};

const dailyQuote = (symbol) => {
  return url('TIME_SERIES_DAILY_ADJUSTED', symbol);
};

export default singleQuote;
