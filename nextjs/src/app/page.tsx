import { Searchbar } from "./_components/Searchbar";
import { DataTable } from "./_components/DataTable";
import { getTickers } from "@/api/fake";
import { tickerColumns } from "./_types/ticker-columns";
import globals from "@/app/globals.module.css";

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
        <h1 className={globals.title}>The Broker</h1>
        <h2 className={globals.subtitle}>Stock Market Info</h2>
      </div>
      <Searchbar />
      <DataTable columns={tickerColumns} data={data} />
    </main>
  );
}
