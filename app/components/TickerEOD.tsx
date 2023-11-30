import type { LinksFunction } from '@remix-run/node';
import styles from '~/styles/components/ticker-eod.css';
import { Input, FormLabel, Card, CardContent } from '@mui/joy';

interface TickerEODProps {
  data: {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  } | null;
  date: string;
  onDateChange: (value: string) => void;
}
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function TickerEOD({
  data,
  date,
  onDateChange,
}: TickerEODProps) {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const integerFormatter = new Intl.NumberFormat('en-US');

  return (
    <Card
      className="ticker-eod"
      sx={{
        width: {
          xs: '100%',
          md: 300,
        },
      }}
    >
      <h1 className="title">End of the day details</h1>
      <CardContent>
        <div className="ticker-eod-controls">
          <FormLabel htmlFor="eod-date">Date:</FormLabel>
          <Input
            id="eod-date"
            name="eod-date"
            type="date"
            value={date}
            onChange={(evt) => onDateChange(evt.target.value)}
          />
        </div>
        {!data ? (
          <h2 className="no-data">
            There's no data for this date on Stock Market
          </h2>
        ) : (
          <dl className="data">
            <dt>Open:</dt>
            <dd>{currencyFormatter.format(data.open)}</dd>
            <dt>Close:</dt>
            <dd>{currencyFormatter.format(data.close)}</dd>
            <dt>High:</dt>
            <dd>{currencyFormatter.format(data.high)}</dd>
            <dt>Low:</dt>
            <dd>{currencyFormatter.format(data.low)}</dd>
            <dt>Volume:</dt>
            <dd>{integerFormatter.format(data.volume)}</dd>
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
