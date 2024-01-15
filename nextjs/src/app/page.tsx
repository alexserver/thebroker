"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-3xl text-sky-700">The Broker</h1>
        <h2 className="text-xl">Stock Market Info</h2>
      </div>
      <div className="flex gap-2">
        <Label htmlFor="ticker">Stock symbol or name</Label>
        <Input id="ticker" name="ticker" />
        <Button>Search</Button>
      </div>
    </main>
  );
}
