"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Searchbar = () => {
  return (
    <div className="flex gap-2">
      <Label htmlFor="ticker">Stock symbol or name</Label>
      <Input id="ticker" name="ticker" />
      <Button>Search</Button>
    </div>
  );
};
