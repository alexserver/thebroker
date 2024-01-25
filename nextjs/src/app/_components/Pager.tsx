"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export interface PagerProps {
  pageSize: number;
  current: number;
  rowsCount: number;
  visiblePages?: number;
  paramName?: string;
}

export function Pager({
  pageSize,
  current,
  rowsCount,
  visiblePages = 5,
  paramName = "page",
}: PagerProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  let query: {
    query?: string;
    page?: string;
  } = {};
  const maxPages =
    rowsCount % pageSize === 0
      ? Math.floor(rowsCount / pageSize)
      : Math.floor(rowsCount / pageSize) + 1;
  const pagesCount = visiblePages > maxPages ? maxPages : visiblePages;
  const items = new Array(pagesCount).fill(0);
  const FIRST_PAGE = 1;
  const LAST_PAGE = maxPages;
  if (params.get("query") !== null) {
    query.query = params.get("query") as string;
  }
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        {/* <PaginationItem>
          rowsCount: {rowsCount} - pageSize: {pageSize} - pagesCount:{" "}
          {pagesCount} - maxPages: {maxPages} - current: {current}
        </PaginationItem> */}
        {/* PREV */}
        <PaginationItem>
          {current > FIRST_PAGE && (
            <PaginationPrevious
              href={{
                pathname: "/",
                query: {
                  ...query,
                  [paramName]: current - 1,
                },
              }}
              scroll={true}
            />
          )}
        </PaginationItem>

        {/* ITEMS */}
        {items.map((item, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              href={{
                pathname: "/",
                query: {
                  ...query,
                  [paramName]: idx + 1,
                },
              }}
              scroll={true}
            >
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* ELLIPSIS */}
        {maxPages > visiblePages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* NEXT */}
        <PaginationItem>
          {current < LAST_PAGE && (
            <PaginationNext
              href={{
                pathname: "/",
                query: {
                  ...query,
                  [paramName]: current + 1,
                },
              }}
              scroll={true}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
