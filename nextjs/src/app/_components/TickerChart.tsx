"use client";

import { Label } from "@/components/ui/label";
import Chart from "./Chart";
import { Input } from "@/components/ui/input";
import type { Ticker } from "../_types/ticker";
import { format, parse, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import globals from "@/app/globals.module.css";
import "./ticker-chart.css";
import { SearchParams } from "@/app/_types/page-params";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { DatePicker } from "./DatePicker";

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

function getDefaultParams(searchParams: ReadonlyURLSearchParams) {
  return {
    date_from:
      searchParams.get("h_date_from") ??
      format(subDays(new Date(), 30), "yyyy-MM-dd"),
    date_to: searchParams.get("h_date_to") ?? format(new Date(), "yyyy-MM-dd"),
    pivot: searchParams.get("h_pivot") ?? "close",
  };
}

export default function TickerChart({ ticker, data }: TickerChartProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const onParamChange =
    (param: string) => (value: string | Date | undefined) => {
      // update the url params
      if (value && (param === "h_date_from" || param === "h_date_to")) {
        params.set(param, format(value, "yyyy-MM-dd"));
      } else if (value && param === "h_pivot") {
        params.set(param, value as string);
      }

      replace(`${pathname}?${params.toString()}`);
    };
  const { date_from, date_to, pivot } = getDefaultParams(searchParams);
  return (
    <div className={cn("ticker-chart", globals.card)}>
      <h1 className={globals.subtitle}>{ticker.symbol} Historical Data</h1>
      <div>
        <div className="ticker-chart-controls">
          <Label htmlFor="date-from">From:</Label>
          <DatePicker
            value={parse(date_from, "yyyy-MM-dd", new Date())}
            onChange={(value) => onParamChange("h_date_from")(value)}
          />

          <Label htmlFor="date_to">To:</Label>
          <DatePicker
            value={parse(date_to, "yyyy-MM-dd", new Date())}
            onChange={(value) => onParamChange("h_date_to")(value ?? "")}
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
          <Chart data={data} data_key={pivot} />
        </div>
      </div>
    </div>
  );
}
