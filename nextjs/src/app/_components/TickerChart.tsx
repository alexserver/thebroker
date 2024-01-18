"use client";

import { Label } from "@/components/ui/label";
import Chart from "./Chart";
import { Input } from "@/components/ui/input";
import type { Ticker } from "../_types/ticker";
import { format } from "date-fns";

interface ChartData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}
interface TickerChartProps {
  ticker: Ticker;
  data: Array<ChartData>;
}

export default function TickerChart({ ticker, data }: TickerChartProps) {
  const onParamChange = (param: string) => (value: string) => {};
  const date_from = format(new Date(), "yyyy-MM-dd");
  const date_to = format(new Date(), "yyyy-MM-dd");
  const data_key = "close";
  return (
    <div className="ticker-chart">
      <h1 className="title">{ticker.symbol} Historical Data</h1>
      <div>
        <div className="ticker-chart-controls">
          <Label htmlFor="date-from">From:</Label>
          <Input
            id="date_from"
            type="date"
            name="date_from"
            value={date_from}
            onChange={(evt) => onParamChange("date_from")(evt.target.value)}
          />

          <Label htmlFor="date_to">To:</Label>
          <Input
            id="date_to"
            type="date"
            name="date_to"
            value={date_to}
            onChange={(evt) => onParamChange("date_to")(evt.target.value)}
          />

          <Label id="select_label" htmlFor="price_type">
            Type:
          </Label>
          {/* <Select
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
          </Select> */}
        </div>
        <div className="bg-white">
          <Chart data={data} data_key={data_key} />
        </div>
      </div>
    </div>
  );
}
