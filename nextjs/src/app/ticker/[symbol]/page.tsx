import { TickerSummary } from "@/app/_components/TickerSummary";
import { getTicker } from "@/api/fake";
import type { Ticker } from "@/app/types/ticker";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

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
  const ticker = await getTickerData({ symbol });

  return (
    <div className={styles.page}>
      <div className="w-full p-4 text-4xl text-center">
        Stock Info: {ticker.name} ({params?.symbol})
      </div>
      <div className={cn("w-full", styles.card)}>
        <TickerSummary ticker={ticker} />
      </div>
      <div className="w-full flex gap-2">
        <div className={styles.card}>Chart</div>
        <div className={styles.card}>EOD</div>
      </div>
    </div>
  );
}
