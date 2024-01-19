"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const Searchbar = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="w-full flex gap-2 items-center">
      <Input
        id="query"
        name="query"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by symbol or name"
        className="w-auto grow"
        defaultValue={searchParams.get("query")?.toString()}
      />

      <Button className="w-[150px]" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};
