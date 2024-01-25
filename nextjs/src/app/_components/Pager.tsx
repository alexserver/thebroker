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
  _debug?: boolean;
}

export function Pager({
  pageSize,
  current,
  rowsCount,
  visiblePages = 5,
  paramName = "page",
  _debug = false,
}: PagerProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  let query: {
    query?: string;
    page?: string;
  } = {};
  // the max amount of pages based on API total rows divided by the page size
  const maxPages =
    rowsCount % pageSize === 0
      ? Math.floor(rowsCount / pageSize)
      : Math.floor(rowsCount / pageSize) + 1;
  // the actual amount of items that will be displayed in the pager, it depends on the requested visible pages, or the max amount of pages the dataset has
  const itemsCount = visiblePages > maxPages ? maxPages : visiblePages;
  const FIRST_PAGE = 1;
  const LAST_PAGE = maxPages;

  function getPageWindow(): { min: number; max: number } {
    if (current === FIRST_PAGE) {
      return {
        min: FIRST_PAGE,
        max: FIRST_PAGE + itemsCount - 1,
      };
    }
    if (current === LAST_PAGE) {
      return {
        min: LAST_PAGE - itemsCount + 1,
        max: LAST_PAGE,
      };
    }
    // if right limit delta is less than left limit delta, the current is closer to the right limit, otherwise, closer to the left limit
    if (LAST_PAGE - current < current - FIRST_PAGE) {
      if (LAST_PAGE - current < itemsCount) {
        return {
          min: LAST_PAGE - itemsCount + 1,
          max: LAST_PAGE,
        };
      } else {
        return {
          min: current,
          max: current + itemsCount - 1,
        };
      }
    } else {
      if (current - FIRST_PAGE < itemsCount) {
        return {
          min: FIRST_PAGE,
          max: FIRST_PAGE + itemsCount - 1,
        };
      } else {
        return {
          min: current - itemsCount + 1,
          max: current,
        };
      }
    }
  }
  function getPageWindowItems({ min, max }: { min: number; max: number }) {
    const array = new Array(max - min + 1).fill(0);
    return array.map((item, idx) => idx + min);
  }

  // the current visible window of pages indexes that the pager will show
  const itemsWindow = getPageWindow();
  const items = getPageWindowItems(itemsWindow);

  if (params.get("query") !== null) {
    query.query = params.get("query") as string;
  }
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        {/* DEBUG */}
        {_debug && (
          <PaginationItem>
            <ul className=" list-none flex gap-1">
              <li className="p-2 bg-slate-900 text-white rounded-sm ">
                pageSize: {pageSize}
              </li>
              <li className="p-2 bg-slate-900 text-white rounded-sm ">
                current: {current}
              </li>
              <li className="p-2 bg-slate-900 text-white rounded-sm ">
                rowsCount: {rowsCount}
              </li>
              <li className="p-2 bg-slate-900 text-white rounded-sm ">
                visiblePages: {visiblePages}
              </li>
              <li className="p-2 bg-slate-600 text-white rounded-sm ">
                maxPages: {maxPages}
              </li>
              <li className="p-2 bg-slate-600 text-white rounded-sm ">
                itemsCount: {itemsCount}
              </li>
              <li className="p-2 bg-slate-600 text-white rounded-sm ">
                itemsWindow: {JSON.stringify(itemsWindow)}
              </li>
              <li className="p-2 bg-slate-600 text-white rounded-sm ">
                items array: {JSON.stringify(items)}
              </li>
            </ul>
          </PaginationItem>
        )}
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
        {items.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              href={{
                pathname: "/",
                query: {
                  ...query,
                  [paramName]: item,
                },
              }}
              scroll={true}
              isActive={item === current}
            >
              {item}
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
