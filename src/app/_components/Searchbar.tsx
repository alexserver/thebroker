"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEventHandler, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const Searchbar = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    evt.preventDefault();
  };
  return (
    // We enclose the searchbar within a Form to take advantage of the input and submit natural interaction
    // when user presses enter
    <form className="w-full" onSubmit={onSubmit}>
      <div className="w-full flex gap-2 items-center">
        <Input
          id="query"
          name="query"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by symbol or name"
          className="w-auto grow"
          defaultValue={searchParams.get("query")?.toString()}
        />

        <Button type="submit" className="w-[150px]">
          Search
        </Button>
      </div>
    </form>
  );
};
