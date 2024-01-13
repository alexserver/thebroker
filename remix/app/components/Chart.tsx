import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { compareAsc, format } from 'date-fns';
import { useMemo } from 'react';

interface ChartOptions {
  data: Array<{
    date: string;
    open?: number;
    close?: number;
    high?: number;
    low?: number;
    volume?: number;
  }>;
  data_key: string;
}

export default function Chart({ data, data_key }: ChartOptions) {
  // memoize a trandformation of data array
  // 1) sort asc by date
  // 2) format date to "MMM d" -> (Nov 1)
  const transformedData = useMemo(
    () =>
      data
        .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
        .map((item) => {
          return {
            ...item,
            date: format(new Date(item.date), 'MMM d'),
          };
        }),
    [data]
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={transformedData}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
        <CartesianGrid strokeDasharray="1" />
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin', 'dataMax']} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={data_key} stroke="#1E3A8A" />
      </LineChart>
    </ResponsiveContainer>
  );
}
