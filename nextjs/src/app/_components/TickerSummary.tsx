import type { Ticker } from "../_types/ticker";
import "./ticker-summary.css";

interface TickerSummaryProps {
  ticker: Ticker;
}

export const TickerSummary = ({ ticker }: TickerSummaryProps) => {
  return (
    <div className="ticker-summary">
      <p>
        <span className="label">Symbol: </span>
        {ticker.symbol}
      </p>
      <p>
        <span className="label">Name: </span>
        {ticker.name}
      </p>
      <p>
        <span className="label">Stock Exchange: </span>
        {ticker.stock_exchange.name}
      </p>
      <p>
        <span className="label">Symbol: </span>
        {ticker.stock_exchange.acronym}
      </p>
      <p>
        <span className="label">Country: </span>
        {ticker.stock_exchange.country}
      </p>
    </div>
  );
};
