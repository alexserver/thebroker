/* API calls library */
const API_URL = process.env.API_URL ?? "";
const API_KEY = process.env.API_KEY ?? "";
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
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 401) {
        return { error: "Unauthorized" };
      }
      return { error: `HTTP error! status: ${res.status}` };
    }
    // Check content type before parsing JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {
        error: `Invalid content type: ${contentType}. Expected application/json`,
      };
    }

    const data = await res.json();
    return "pagination" in data && "data" in data ? data : null;
  } catch (error) {
    console.error("Error fetching data ", error);
    return { error };
  }
};

export const getTicker = async ({ symbol }: { symbol: string | undefined }) => {
  const url = `${API_URL}/tickers/${symbol}?access_key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data && "name" in data && "symbol" in data ? data : null;
  } catch (error) {
    console.error("Error fetching data ", error);
    return { error };
  }
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
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data && "open" in data && "low" in data && "close" in data
      ? data
      : null;
  } catch (error) {
    console.error("Error fetching data ", error);
    return { error };
  }
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
  try {
    const res = await fetch(url);
    const data = await res.json();
    return "pagination" in data && "data" in data ? data : null;
  } catch (error) {
    console.error("Error fetching data ", error);
    return { error };
  }
};
