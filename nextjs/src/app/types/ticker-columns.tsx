"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Ticker = {
  name: string;
  symbol: string;
  has_intraday: boolean;
  has_eod: boolean;
  country: string | null;
  stock_exchange: {
    name: string | null;
    acronym: string | null;
    mic: string | null;
    country: string | null;
    country_code: string | null;
    city: string | null;
    website: string | null;
  };
};

export const tickerColumns: ColumnDef<Ticker>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => {
      const symbol = row.getValue("symbol") as string;
      return <Link href={`/ticker/${symbol}`}>{symbol}</Link>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const symbol = row.getValue("symbol") as string;
      const name = row.getValue("name") as string;
      return <Link href={`/ticker/${symbol}`}>{name}</Link>;
    },
  },
  {
    accessorKey: "stock_exchange.acronym",
    header: "Stock Acronym",
  },
  {
    accessorKey: "stock_exchange.country",
    header: "Stock Country",
  },
];
