import { TickerSummary } from "@/app/_components/TickerSummary";
import { TickerEOD } from "@/app/_components/TickerEOD";
import { getTicker, getTickerEod } from "@/api/fake";
import type { Ticker } from "@/app/_types/ticker";

import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import TickerChart from "@/app/_components/TickerChart";
import styles from "./styles.module.css";
import globals from "@/app/globals.module.css";

async function getTickerData({ symbol }: { symbol: string }): Promise<Ticker> {
  const ticker = (await getTicker({ symbol })) as Ticker;
  return ticker;
}

export default async function TickerView({
  params,
}: {
  params?: {
    symbol?: string;
  };
}) {
  const symbol = params?.symbol ?? "";
  const day = format(new Date(), "yyyy-MM-dd");
  const ticker = await getTickerData({ symbol });
  const eod = await getTickerEod({ symbol, date: day });

  return (
    <div className={styles.page}>
      <div className="w-full p-4">
        <h1 className={globals.title}>
          Stock Info: {ticker.name} ({params?.symbol})
        </h1>
      </div>
      <div className={cn("w-full", globals.card)}>
        <TickerSummary ticker={ticker} />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
        <div className={cn("w-full grow", globals.card)}>
          <TickerChart ticker={ticker} data={[]} />
        </div>
        <div className={globals.card}>
          <TickerEOD ticker={ticker} eod={eod} />
        </div>
      </div>
    </div>
  );
}
