const url = (quoteType, symbol) =>
  `https://www.alphavantage.co/query?function=${quoteType}&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

export const singleQuote = (symbol) => {
  return url('GLOBAL_QUOTE', symbol);
};

export const dailyQuote = (symbol) => {
  return url('TIME_SERIES_DAILY_ADJUSTED', symbol);
};

export const searchQuote = (symbol) => {
  return url('SYMBOL_SEARCH', symbol);
};
