import { Searchbar } from "./components/Searchbar";
import { DataTable } from "./components/DataTable";
import { getTickers } from "@/api/fake";
import { tickerColumns } from "./types/ticker-columns";

async function getData({ page = 1, query = "", limit = 20 }) {
  return getTickers({ limit, page, query });
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const { data } = await getData({ page, query });
  return (
    <main className="flex flex-col items-center justify-start p-10 w-full gap-4">
      <div className="w-full text-center">
        <h1 className="text-3xl text-sky-700">The Broker</h1>
        <h2 className="text-xl">Stock Market Info</h2>
      </div>
      <Searchbar />
      <DataTable columns={tickerColumns} data={data} />
    </main>
  );
}
