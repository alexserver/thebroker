"use client";

import { Label } from "@/components/ui/label";
import { DatePicker } from "./DatePicker";
import type { Ticker } from "../_types/ticker";
import type { TickerEOD as TickerEODType } from "../_types/ticker-eod";
import { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import "./ticker-eod.css";

interface TickerEODInfoProps {
  ticker: Ticker;
  eod: TickerEODType;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const integerFormatter = new Intl.NumberFormat("en-US");

export const TickerEOD = ({ ticker, eod }: TickerEODInfoProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [date, setDate] = useState<Date>();

  const onDateChange = (value: Date | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("eod", format(value, "yyyy-MM-dd"));
    } else {
      params.delete("eod");
    }
    setDate(value);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    // if URL contains eod param, we set the date so it's passed down to DatePicker
    const dt = searchParams.get("eod");
    if (dt) {
      setDate(parse(dt, "yyyy-MM-dd", new Date()));
    }
  }, [searchParams]);

  return (
    <div className="ticker-eod">
      <h1 className="title">End of the Day details</h1>

      <div className="ticker-eod-controls">
        <Label>Date: </Label>
        <DatePicker value={date} onChange={onDateChange} />
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
