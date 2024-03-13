"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { compareAsc, format } from "date-fns";
import { useMemo } from "react";

type data_key = "open" | "close" | "high" | "low" | "volume";
export interface ChartOptions {
  data: Array<{
    date: string;
    open?: number;
    close?: number;
    high?: number;
    low?: number;
    volume?: number;
  }>;
  data_keys: Array<data_key>;
  chart_type?: "line" | "area";
}

const colors = {
  open: "#265073",
  close: "#2D9596",
  high: "#FF407D",
  low: "#40679E",
  volume: "#5F5D9C",
};

export default function Chart({
  data,
  data_keys,
  chart_type = "line",
}: ChartOptions) {
  // memoize a transformation of data array
  // 1) sort asc by date
  // 2) format date to "MMM d" -> (Nov 1)
  const transformedData = useMemo(
    () =>
      data
        .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
        .map((item) => {
          return {
            ...item,
            date: format(new Date(item.date), "MMM d"),
          };
        }),
    [data]
  );

  if (chart_type === "line")
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={transformedData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Legend />
          {data_keys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[key]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );

  if (chart_type === "area" && data_keys.length > 0)
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={transformedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {data_keys.map((key) => (
              <linearGradient
                key={key}
                id={`color${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[key]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[key]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <CartesianGrid strokeDasharray="1" />
          <Tooltip />
          {data_keys.map((key) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[key]}
              fillOpacity={1}
              fill={`url(#color${key})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
}
