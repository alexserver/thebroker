import type { Ticker } from "../_types/ticker";

interface TickerSummaryProps {
  ticker: Ticker;
}

export const TickerSummary = ({ ticker }: TickerSummaryProps) => {
  return (
    <div className="flex gap-2 lg:gap-4 flex-wrap justify-between lg:justify-start text-base text-sky-800">
      <p className="flex flex-col lg:flex-row gap-2">
        <span className="font-bold text-blue-700">Symbol: </span>
        {ticker.symbol}
      </p>
      <p className="flex flex-col lg:flex-row gap-2">
        <span className="font-bold text-blue-700">Name: </span>
        {ticker.name}
      </p>
      <p className="flex flex-col lg:flex-row gap-2">
        <span className="font-bold text-blue-700">Stock Exchange: </span>
        {ticker.stock_exchange.name}
      </p>
      <p className="flex flex-col lg:flex-row gap-2">
        <span className="font-bold text-blue-700">Symbol: </span>
        {ticker.stock_exchange.acronym}
      </p>
      <p className="flex flex-col lg:flex-row gap-2">
        <span className="font-bold text-blue-700">Country: </span>
        {ticker.stock_exchange.country}
      </p>
    </div>
  );
};
