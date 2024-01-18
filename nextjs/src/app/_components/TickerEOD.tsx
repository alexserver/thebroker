"use client";

import { Label } from "@/components/ui/label";
import { DatePicker } from "./DatePicker";
import type { Ticker } from "../_types/ticker";
import type { TickerEOD as TickerEODType } from "../_types/ticker-eod";
import "./ticker-eod.css";
import { useState } from "react";

interface TickerEODInfoProps {
  ticker: Ticker;
  eod: TickerEODType;
}

export const TickerEOD = ({ ticker, eod }: TickerEODInfoProps) => {
  const [date, setDate] = useState<Date>();
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const integerFormatter = new Intl.NumberFormat("en-US");
  return (
    <div className="ticker-eod">
      <h1>End of the Day details</h1>

      <div className="ticker-eod-controls">
        <Label>Date: </Label>
        <DatePicker value={date} onChange={setDate} />
      </div>
      {!eod ? (
        <h2 className="no-data">
          There&apos;s no data for this date on Stock Market
        </h2>
      ) : (
        <dl className="data">
          <dt>Open:</dt>
          <dd>{currencyFormatter.format(eod.open)}</dd>
          <dt>Close:</dt>
          <dd>{currencyFormatter.format(eod.close)}</dd>
          <dt>High:</dt>
          <dd>{currencyFormatter.format(eod.high)}</dd>
          <dt>Low:</dt>
          <dd>{currencyFormatter.format(eod.low)}</dd>
          <dt>Volume:</dt>
          <dd>{integerFormatter.format(eod.volume)}</dd>
        </dl>
      )}
    </div>
  );
};
