"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icons } from "@/components/icons";
import { Input } from "@/components/primitives/ui/input";

export function Search() {
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  React.useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearch(keyword);
    }
  }, [searchParams]);
  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("keyword", search);
    router.push(`/rank?${newSearchParams.toString()}`);
  };
  return (
    <div className="relative w-full">
      <Input
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
        className="pr-8 h-9 rounded-xl bg-background"
      />
      <Icons.search
        size={20}
        onClick={() => {
          handleSearch();
        }}
        className="absolute top-2 right-2 text-muted-foreground"
      />
    </div>
  );
}
