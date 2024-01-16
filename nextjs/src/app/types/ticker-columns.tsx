"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Ticker } from "./ticker";
import Link from "next/link";

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
