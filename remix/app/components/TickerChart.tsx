import type { LinksFunction } from '@remix-run/node';
import styles from '~/styles/components/ticker-chart.css';
import Chart from './Chart';
import { Input, Card, CardContent, FormLabel, Select, Option } from '@mui/joy';

interface ChartData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}
interface TickerChartProps {
  symbol: string;
  data: Array<ChartData>;
  date_from: string;
  date_to: string;
  data_key: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onDataTypeChange: (value: string) => void;
}
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function TickerChart({
  symbol,
  data,
  date_from,
  date_to,
  data_key,
  onDateFromChange,
  onDateToChange,
  onDataTypeChange,
}: TickerChartProps) {
  return (
    <Card className="ticker-chart">
      <h1 className="title">{symbol} Historical Data</h1>
      <CardContent>
        <div className="ticker-chart-controls">
          <FormLabel htmlFor="date_from">From:</FormLabel>
          <Input
            id="date_from"
            type="date"
            name="date_from"
            value={date_from}
            onChange={(evt) => onDateFromChange(evt.target.value)}
          />

          <FormLabel htmlFor="date_to">To:</FormLabel>
          <Input
            id="date_to"
            type="date"
            name="date_to"
            value={date_to}
            onChange={(evt) => onDateToChange(evt.target.value)}
          />

          <FormLabel id="select_label" htmlFor="price_type">
            Type:
          </FormLabel>
          <Select
            id="price_type"
            name="price_type"
            value={data_key}
            onChange={(
              event: React.SyntheticEvent | null,
              newValue: string | null
            ) => onDataTypeChange(newValue ?? '')}
            slotProps={{
              button: {
                id: 'price_type',
                name: 'price_type',
                'aria-labelledby': 'select_label',
              },
            }}
          >
            <Option value="open">Open</Option>
            <Option value="close">Close</Option>
            <Option value="high">High</Option>
            <Option value="low">Low</Option>
            <Option value="volume">Volume</Option>
          </Select>
        </div>
        <div className="bg-white">
          <Chart data={data} data_key={data_key} />
        </div>
      </CardContent>
    </Card>
  );
}
