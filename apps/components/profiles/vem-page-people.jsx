"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/primitives/ui/card";
import { Separator } from "@/components/primitives/ui/separator";
import { Tabs, TabsContent } from "@/components/primitives/ui/tabs";

import { TabListButton } from "./_comps/tab-list-button";
import { AllNovels } from "./tab-lists/all-novels";

export function VemPagePeople({ searchParams, data }) {
  return (
    <Card className="border-none shadow-none dark:ring-1 dark:ring-border">
      <Tabs defaultValue="booklists">
        <CardHeader className="flex flex-row items-center py-4">
          <TabListButton data={data} searchParams={searchParams} />
        </CardHeader>
        <Separator />
        <CardContent className="mt-6">
          <TabsContent value="booklists" className="space-y-6">
            {data?.length ? (
              data?.map((item) => <AllNovels key={item.id} item={item} />)
            ) : (
              <CardDescription>Không có dữ liệu</CardDescription>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
