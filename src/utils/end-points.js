export const singleQuote = (symbol) =>
  `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

export const timeSeriesQuote = (symbol, outputSize) =>
  `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&${outputSize}=full&apikey=${process.env.REACT_APP_API_KEY}`;

export const searchQuote = (keyword) =>
  `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.REACT_APP_API_KEY}`;
