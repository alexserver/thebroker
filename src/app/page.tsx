import { Searchbar } from "./_components/Searchbar";
import { DataTable } from "./_components/DataTable";
import { getTickers } from "@/api";
import { tickerColumns } from "./_types/ticker-columns";
import { Pager, type PagerProps } from "./_components/Pager";

async function getData({
  page,
  query = "",
}: {
  page?: number;
  query?: string;
}) {
  return getTickers({ page, query });
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
  const result = await getData({ page, query });

  if (!result || "error" in result) {
    return (
      <main className="flex flex-col items-center justify-start p-10 mt-10 lg:mt-28 w-full gap-6">
        There&apos;s a problem fetching data at this moment
      </main>
    );
  }
  const { pagination, data } = result;
  const pagerProps: PagerProps = {
    pageSize: pagination.limit,
    current: page,
    rowsCount: pagination.total,
    paramName: "page",
  };
  return (
    <main className="flex flex-col items-center justify-start p-10 mt-10 lg:mt-28 w-full gap-6">
      <Searchbar />
      <DataTable columns={tickerColumns} data={data} />
      <Pager {...pagerProps} />
    </main>
  );
}
