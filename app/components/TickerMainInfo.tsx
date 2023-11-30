import type { LinksFunction } from '@remix-run/node';
import styles from '~/styles/components/ticker-main-info.css';
import { Card, CardContent } from '@mui/joy';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

interface TickerMainInfoProps {
  symbol: string;
  name: string;
  stockex: {
    name: string;
    acronym: string;
    country: string;
  };
}
export default function TickerMainInfo({
  symbol,
  name,
  stockex,
}: TickerMainInfoProps) {
  return (
    <Card className="ticker-main-info" sx={{ margin: '2em 0', padding: '1em' }}>
      <CardContent
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: {
            sm: 'column',
            md: 'row',
          },
        }}
      >
        <p>
          <span className="label">Symbol: </span>
          {symbol}
        </p>
        <p>
          <span className="label">Name: </span>
          {name}
        </p>
        <p>
          <span className="label">Stock Exchange: </span>
          {stockex.name}
        </p>
        <p>
          <span className="label">Symbol: </span>
          {stockex.acronym}
        </p>
        <p>
          <span className="label">Country: </span>
          {stockex.country}
        </p>
      </CardContent>
    </Card>
  );
}
