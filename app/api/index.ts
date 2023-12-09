/* API calls library */
import {
  getTickers as getTickersFake,
  getTicker as getTickerFake,
  getTickerEod as getTickerEodFake,
  getTickerHistorical as getTickerHistoricalFake,
} from './fake';

const apiUrl = process.env.MARKETSTACK_API_URL ?? '';
const apiKey = process.env.MARKETSTACK_API_KEY ?? '';
const testAPI = process.env.TEST_API === 'true' ?? false;

export const getTickers = async ({
  limit = 100,
  page = 0,
  query = '',
}: {
  limit?: number;
  page?: number;
  query?: string;
}) => {
  // if we're testing, return from fake API, else, from real API
  if (testAPI) {
    return getTickersFake({ limit, page, query });
  }

  const offset: number = limit * (page - 1); // app is using 1-index based pagination, but API doesn't)
  let url: string = `${apiUrl}/tickers?access_key=${apiKey}&limit=${limit}&offset=${offset}`;
  if (typeof query === 'string' && query !== '') {
    url += `&search=${query}`;
  }
  const res = await fetch(url);
  return res.json();
};

export const getTicker = async ({ symbol }: { symbol: string | undefined }) => {
  // if we're testing, return from fake API, else, from real API
  if (testAPI) {
    return getTickerFake({ symbol });
  }

  const url = `${apiUrl}/tickers/${symbol}?access_key=${apiKey}`;
  const res = await fetch(url);
  return res.json();
};

export const getTickerEod = async ({
  symbol,
  date,
}: {
  symbol: string | undefined;
  date?: string | null;
}) => {
  // if we're testing, return from fake API, else, from real API
  if (testAPI) {
    return getTickerEodFake({ symbol, date });
  }
  const when = date ?? 'latest';
  const url = `${apiUrl}/tickers/${symbol}/eod/${when}?access_key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  // when API returns [], there's no data for that day in Stock Exchange.
  if (Array.isArray(data) && data.length === 0) return null;
  // else return data
  else return data;
};

export const getTickerHistorical = async ({
  symbol,
  date_from,
  date_to,
}: {
  symbol: string | undefined;
  date_from: string | null;
  date_to: string | null;
}) => {
  // if we're testing, return from fake API, else, from real API
  if (testAPI) {
    return getTickerHistoricalFake({ symbol, date_from, date_to });
  }
  const url = `${apiUrl}/eod?access_key=${apiKey}&symbols=${symbol}&date_from=${date_from}&date_to=${date_to}`;
  const res = await fetch(url);
  return res.json();
};
