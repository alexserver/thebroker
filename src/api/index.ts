/* API calls library */
const TEST_API = process.env.TEST_API === "true" ?? false;
const API_URL =
  (TEST_API ? process.env.TEST_API_URL : process.env.MARKETSTACK_API_URL) ?? "";
const API_KEY =
  (TEST_API ? process.env.TEST_API_KEY : process.env.MARKETSTACK_API_KEY) ?? "";
const API_DEFAULT_LIMIT = Number(process.env.API_REQUEST_LIMIT) ?? 10;
const API_DEFAULT_PAGE = 1;

export const getTickers = async ({
  limit = API_DEFAULT_LIMIT,
  page = API_DEFAULT_PAGE,
  query = "",
}: {
  limit?: number;
  page?: number;
  query?: string;
}) => {
  const offset: number = limit * (page - 1); // app is using 1-index based pagination, but API doesn't)
  let url: string = `${API_URL}/tickers?access_key=${API_KEY}&limit=${limit}&offset=${offset}`;
  if (typeof query === "string" && query !== "") {
    url += `&search=${query}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  console.log({ url, data });
  return data && "pagination" in data && "data" in data ? data : null;
};

export const getTicker = async ({ symbol }: { symbol: string | undefined }) => {
  const url = `${API_URL}/tickers/${symbol}?access_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log({ url, data });
  return data && "name" in data && "symbol" in data ? data : null;
};

export const getTickerEod = async ({
  symbol,
  date,
}: {
  symbol: string | undefined;
  date?: string | null;
}) => {
  const when = date ?? "latest";
  const url = `${API_URL}/tickers/${symbol}/eod/${when}?access_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log({ url, data });
  return data && "open" in data && "low" in data && "close" in data
    ? data
    : null;
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
  const url = `${API_URL}/eod?access_key=${API_KEY}&symbols=${symbol}&date_from=${date_from}&date_to=${date_to}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log({ url, data });
  return data && "pagination" in data && "data" in data ? data : null;
};
