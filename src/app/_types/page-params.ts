export type Params = {
  symbol?: string;
};
export type SearchParams = {
  h_date_from?: string;
  h_date_to?: string;
  h_pivot?: string;
  eod_date?: string;
};
export type PageProps = {
  params?: Params;
  searchParams?: SearchParams;
};
