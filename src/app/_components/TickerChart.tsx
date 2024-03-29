"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import Chart, { type ChartOptions, type DataKey, isDataKey } from "./Chart";
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

interface SearchParams {
  date_from: string;
  date_to: string;
  chart_type: "line" | "area";
  data_type: "prices" | "volume";
  keys: Array<DataKey>;
}

function getDefaultParams(searchParams: ReadonlyURLSearchParams): SearchParams {
  const parseKeys = (val: string[]): Array<DataKey> => {
    const value = val.filter((key) => isDataKey(key)) as Array<DataKey>;
    // if no params provided through url, show 4 keys as default
    if (value.length === 0) return ["open", "close", "high", "low"];
    // otherwise, return what comes from url params
    return value;
  };
  return {
    date_from:
      searchParams.get("h_date_from") ??
      format(subDays(new Date(), 30), "yyyy-MM-dd"),
    date_to: searchParams.get("h_date_to") ?? format(new Date(), "yyyy-MM-dd"),
    chart_type: searchParams.get("chart_type") === "line" ? "line" : "area",
    data_type: searchParams.get("data_type") === "volume" ? "volume" : "prices",
    keys: parseKeys(searchParams.getAll("keys")),
  };
}

export default function TickerChart({ ticker, data }: TickerChartProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { date_from, date_to, chart_type, data_type, keys } =
    getDefaultParams(searchParams);
  const items = [
    { id: "open", label: "Open" },
    { id: "close", label: "Close" },
    { id: "high", label: "High" },
    { id: "low", label: "Low" },
  ];
  const onParamChange = (param: string) => (value: any) => {
    // update the url params
    if (value && ["h_date_from", "h_date_to"].includes(param)) {
      params.set(param, format(value, "yyyy-MM-dd"));
    } else if (value && ["chart_type", "data_type"].includes(param)) {
      // TODO, if param === data_type && value === prices, reset chart_keys to ALL
      params.set(param, value as string);
    } else if (param.match(/^keys\.[a-z]+/)) {
      // if param matches 'keys.a-z'
      const [name, key] = param.split(".");
      if (value) params.append("keys", key);
      else if (keys.length > 1) {
        // if value is unchecked but we have at least 2 checked boxes (we don't want to leave an empty array)
        const keysCount = params.getAll("keys").length;
        if (keysCount === 0) {
          // refresh url param keys[] to all keys except the one that is unchecked
          keys
            .filter((k) => k !== key)
            .forEach((k) => params.append("keys", k));
        } else if (keysCount > 1) {
          params.delete("keys", key);
        }
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };
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
            <Label htmlFor="price_type">Chart Type:</Label>
            <Select
              value={chart_type}
              options={[
                { value: "line", label: "Line" },
                { value: "area", label: "Area" },
              ]}
              onValueChange={(value) => onParamChange("chart_type")(value)}
            />
          </div>
          <div className="form-control">
            <Label htmlFor="price_type">Data Type:</Label>
            <Select
              value={data_type}
              options={[
                { value: "prices", label: "Prices" },
                { value: "volume", label: "Volume" },
              ]}
              onValueChange={(value) => onParamChange("data_type")(value)}
            />
          </div>
        </div>
        {data_type === "prices" && (
          <div className="ticker-chart-controls">
            <div className="form-control-horizontal">
              <Label className="leading-none">Prices: </Label>
            </div>
            {items.map((item) => (
              <div key={item.id} className="form-control-horizontal">
                <Checkbox
                  id="show-open"
                  checked={keys.includes(item.id as DataKey)}
                  onCheckedChange={(checked) =>
                    onParamChange(`keys.${item.id}`)(checked)
                  }
                />
                <Label htmlFor="show-open" className="leading-none">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        )}
        <div className="bg-white">
          <Chart
            data={data}
            chart_type={chart_type as ChartOptions["chart_type"]}
            data_type={data_type}
            data_keys={keys}
          />
        </div>
      </div>
    </div>
  );
}
