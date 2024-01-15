import { Searchbar } from "./components/Searchbar";
import { DataTable } from "./components/DataTable";
import { getTickers } from "@/api/fake";
import { tickerColumns } from "./types/ticker-columns";

async function getData() {
  const page = 1;
  const query = "";
  const limit = 20;
  const { pagination, data } = await getTickers({ limit, page, query });
  return { pagination, data };
}

export default async function Home() {
  const { data } = await getData();
  return (
    <main className="flex flex-col items-center justify-start p-10 w-full gap-4">
      <div className="w-full">
        <h1 className="text-3xl text-sky-700">The Broker</h1>
        <h2 className="text-xl">Stock Market Info</h2>
      </div>
      <Searchbar />
      <div>
        <DataTable columns={tickerColumns} data={data} />
      </div>
    </main>
  );
}
