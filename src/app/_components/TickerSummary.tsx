import type { Ticker } from "../_types/ticker";
import globals from "@/app/globals.module.css";
import "./ticker-summary.css";
import { cn } from "@/lib/utils";

interface TickerSummaryProps {
  ticker: Ticker;
}

export const TickerSummary = ({ ticker }: TickerSummaryProps) => {
  return (
    <div className={cn("ticker-summary", globals.card)}>
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
