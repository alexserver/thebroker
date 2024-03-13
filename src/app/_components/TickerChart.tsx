"use client";

import { Label } from "@/components/ui/label";
import Chart, { type ChartOptions } from "./Chart";
import type { Ticker } from "../_types/ticker";
import { format, parse, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import globals from "@/app/globals.module.css";
import "./ticker-chart.css";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { DatePicker } from "./DatePicker";
import { Select } from "./Select";

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
    chart_type: searchParams.get("chart_type") ?? "area",
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
      } else if (value && param === "chart_type") {
        params.set(param, value as string);
      }

      replace(`${pathname}?${params.toString()}`);
    };
  const { date_from, date_to, chart_type } = getDefaultParams(searchParams);
  return (
    <div className={cn("ticker-chart", globals.card)}>
      <h1 className={globals.subtitle}>{ticker.symbol} Historical Data</h1>
      <div>
        <div className="ticker-chart-controls">
          <div className="form-control">
            <Label htmlFor="date-from">From:</Label>
            <DatePicker
              value={parse(date_from, "yyyy-MM-dd", new Date())}
              onChange={(value) => onParamChange("h_date_from")(value)}
            />
          </div>
          <div className="form-control">
            <Label htmlFor="date_to">To:</Label>
            <DatePicker
              value={parse(date_to, "yyyy-MM-dd", new Date())}
              onChange={(value) => onParamChange("h_date_to")(value ?? "")}
            />
          </div>
          <div className="form-control">
            <Label htmlFor="price_type">Type:</Label>
            <Select
              value={chart_type}
              options={[
                { value: "line", label: "Line" },
                { value: "area", label: "Area" },
              ]}
              onValueChange={(value) => onParamChange("chart_type")(value)}
            />
          </div>
        </div>
        <div className="bg-white">
          <Chart
            data={data}
            chart_type={chart_type as ChartOptions["chart_type"]}
            data_keys={["open", "close", "high", "low"]}
          />
        </div>
      </div>
    </div>
  );
}
