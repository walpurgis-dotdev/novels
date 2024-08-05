"use client";

import Link from "next/link";
import { CardDescription, CardTitle } from "@/components/primitives/ui/card";
import { TabsList, TabsTrigger } from "@/components/primitives/ui/tabs";

export function TabListButton({ searchParams, data }) {
  return (
    <TabsList className="space-x-4">
      <TabsTrigger
        value="booklists"
        className="p-0 data-[state=active]:text-destructive data-[state=active]:bg-transparent"
      >
        <Link href={{ query: { ...searchParams, tab: "booklists" } }} className="flex items-center">
          <CardTitle className="text-base">Danh sách tác phẩm</CardTitle>
          <CardDescription className="text-xs">【{data?.length}】</CardDescription>
        </Link>
      </TabsTrigger>
    </TabsList>
  );
}
