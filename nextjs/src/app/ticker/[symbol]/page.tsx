import { TickerSummary } from "@/app/_components/TickerSummary";
import { TickerEOD } from "@/app/_components/TickerEOD";
import { getTicker, getTickerEod, getTickerHistorical } from "@/api/fake";
import type { Ticker } from "@/app/_types/ticker";
import { ArrowLeft } from "lucide-react";
import { format, subDays } from "date-fns";
import TickerChart from "@/app/_components/TickerChart";
import styles from "./styles.module.css";
import globals from "@/app/globals.module.css";
import Link from "next/link";
import type { PageProps } from "@/app/_types/page-params";

function getDefaultParams({ params, searchParams }: PageProps) {
  return {
    params: {
      symbol: params?.symbol ?? "",
    },
    searchParams: {
      h_date_from:
        searchParams?.h_date_from ??
        format(subDays(new Date(), 30), "yyyy-MM-dd"),
      h_date_to: searchParams?.h_date_to ?? format(new Date(), "yyyy-MM-dd"),
      h_pivot: searchParams?.h_pivot ?? "close",
      eod_date: searchParams?.eod_date ?? format(new Date(), "yyyy-MM-dd"),
    },
  };
}

async function getData(props: PageProps) {
  const defaultParams = getDefaultParams(props);
  const { symbol } = defaultParams.params;
  const { h_date_from, h_date_to, eod_date } = defaultParams.searchParams;
  const ticker = (await getTicker({ symbol })) as Ticker;
  const eod = await getTickerEod({ symbol, date: eod_date });
  const history = await getTickerHistorical({
    symbol,
    date_from: h_date_from,
    date_to: h_date_to,
  });
  return { ticker, eod, history };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { ticker, eod, history } = await getData({ params, searchParams });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/">
          <ArrowLeft className="w-10 h-10" />
        </Link>
        <h1 className={globals.title}>
          Stock Info: {ticker.name} ({params?.symbol})
        </h1>
      </div>
      <TickerSummary ticker={ticker} />
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-between">
        <TickerChart ticker={ticker} data={history.data} />
        <TickerEOD ticker={ticker} eod={eod} />
      </div>
    </div>
  );
}
