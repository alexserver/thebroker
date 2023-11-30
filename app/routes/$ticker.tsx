import {
  json,
  type LoaderFunctionArgs,
  type LinksFunction,
  type MetaFunction,
} from '@remix-run/node';
import styles from '~/styles/ticker.css';
import TickerMainInfo, {
  links as tickerMainInfoLinks,
} from '~/components/TickerMainInfo';
import TickerEOD, { links as tickerEODLinks } from '~/components/TickerEOD';
import TickerChart, {
  links as tickerChartLinks,
} from '~/components/TickerChart';
import { getTicker, getTickerEod, getTickerHistorical } from '~/api';
import { format, subDays } from 'date-fns';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import BackIcon from '~/components/icons/BackIcon';
import TickerAutocomplete from '~/components/TickerAutocomplete';

export const meta: MetaFunction = () => {
  return [
    { title: 'The Broker' },
    { name: 'description', content: 'US Stock Market' },
  ];
};

export const links: LinksFunction = () => [
  ...tickerMainInfoLinks(),
  ...tickerEODLinks(),
  ...tickerChartLinks(),
  { rel: 'stylesheet', href: styles },
];

const getUrlParams = (searchParams: URLSearchParams) => {
  return {
    eod_date: searchParams.get('eod_date'),
    h_date_from: searchParams.get('h_date_from'),
    h_date_to: searchParams.get('h_date_to'),
    h_key: searchParams.get('h_key'),
  };
};

const getParamsDefaults = (params: {
  eod_date: string | null | undefined;
  h_date_from: string | null | undefined;
  h_date_to: string | null | undefined;
  h_key: string | null | undefined;
}) => {
  return {
    eod_date: params.eod_date ?? format(new Date(), 'yyyy-MM-dd'),
    h_date_from:
      params.h_date_from ?? format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    h_date_to: params.h_date_to ?? format(new Date(), 'yyyy-MM-dd'),
    h_key: params.h_key ?? 'close',
  };
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { ticker: symbol } = params;
  const searchParams = new URL(request.url).searchParams;
  const urlParams = getParamsDefaults(getUrlParams(searchParams));

  const data = await getTicker({ symbol });
  const eod = await getTickerEod({ symbol, date: urlParams.eod_date });
  const historical = await getTickerHistorical({
    symbol,
    date_from: urlParams.h_date_from,
    date_to: urlParams.h_date_to,
  });

  return json({
    data,
    eod,
    historical,
  });
}

export default function TickerView() {
  const { data, eod, historical } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = getParamsDefaults(getUrlParams(searchParams));
  const onParamChange = (param: string) => (value: string) => {
    // maybe not the best idea to affect searchParams directly
    searchParams.set(param, value);
    setSearchParams(searchParams);
  };

  if (!data) {
    return (
      <div className="ticker-page">
        <div className="ticker-page-head">
          <div className="title">
            <a href="/" className="go-back">
              <BackIcon width={24} height={24} />
            </a>
            <h1>No data for this symbol</h1>
          </div>
          <TickerAutocomplete />
        </div>
      </div>
    );
  }

  const { name, symbol, stock_exchange: stockex } = data;
  return (
    <div className="ticker-page">
      <div className="ticker-page-head">
        <div className="title">
          <a href="/" className="go-back">
            <BackIcon width={24} height={24} />
          </a>
          <h1>
            Stock Info: {name} ({symbol})
          </h1>
        </div>
        <TickerAutocomplete />
      </div>
      <TickerMainInfo name={name} symbol={symbol} stockex={stockex} />
      <div className="ticker-page-body">
        <TickerChart
          symbol={symbol}
          date_from={urlParams.h_date_from}
          date_to={urlParams.h_date_to}
          data_key={urlParams.h_key}
          data={historical.data}
          onDataTypeChange={onParamChange('h_key')}
          onDateFromChange={onParamChange('h_date_from')}
          onDateToChange={onParamChange('h_date_to')}
        />
        <TickerEOD
          data={eod}
          date={urlParams.eod_date}
          onDateChange={onParamChange('eod_date')}
        />
      </div>
    </div>
  );
}
