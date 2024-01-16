export default async function TickerView({
  params,
}: {
  params?: {
    symbol?: string;
  };
}) {
  return <div>Ticker {params?.symbol}</div>;
}
