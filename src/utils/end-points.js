const url = (quoteType, symbol) =>
  `https://www.alphavantage.co/query?function=${quoteType}&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

const timeSeriesUrl = (quoteType, symbol, outputSize) =>
  `https://www.alphavantage.co/query?function=${quoteType}&symbol=${symbol}&${outputSize}=full&apikey=${process.env.REACT_APP_API_KEY}`;

const searchUrl = (quoteType, keyword) =>
  `https://www.alphavantage.co/query?function=${quoteType}&keywords=${keyword}&apikey=${process.env.REACT_APP_API_KEY}`;

export const singleQuote = (symbol) => {
  return url('GLOBAL_QUOTE', symbol);
};

export const timeSeriesQuote = (symbol, outputSize) => {
  return timeSeriesUrl('TIME_SERIES_DAILY_ADJUSTED', symbol, outputSize);
};

export const searchQuote = (keyword) => {
  return searchUrl('SYMBOL_SEARCH', keyword);
};
