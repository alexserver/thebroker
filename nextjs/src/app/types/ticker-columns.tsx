"use client";

import { ColumnDef } from "@tanstack/react-table";

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
  },
  {
    accessorKey: "name",
    header: "Name",
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
