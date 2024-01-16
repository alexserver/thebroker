import type { Ticker } from "../_types/ticker";
import type { TickerEOD as TickerEODType } from "../_types/ticker-eod";
import "./ticker-eod.css";

interface TickerEODInfoProps {
  ticker: Ticker;
  eod: TickerEODType;
}

export const TickerEOD = ({ ticker, eod }: TickerEODInfoProps) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const integerFormatter = new Intl.NumberFormat("en-US");
  return (
    <div className="ticker-eod">
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
