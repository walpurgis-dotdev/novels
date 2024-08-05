"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/ui/card";

import { ListContent } from "./_comps/list-content";
import { UpdatedChapter } from "./_comps/updated-chapter";

export function ListOfContents({ chapters, slug }) {
  const [isReversed, setIsReversed] = React.useState(true);

  const sortChapters = (sortBy = "createdAt") =>
    [...chapters].sort((a, b) => {
      const dateA = new Date(a[sortBy]);
      const dateB = new Date(b[sortBy]);
      return dateB.getTime() - dateA.getTime();
    });

  const sortedChapters = isReversed ? sortChapters().reverse() : sortChapters();

  const toggleOrder = () => {
    setIsReversed(!isReversed);
  };

  return (
    <Card className="border-none shadow-none dark:ring-1 dark:ring-border">
      <CardHeader className="flex flex-row items-center justify-between space-x-2 space-y-0">
        <CardTitle className="shrink-0">Thư mục chương</CardTitle>
        <Button size="sm" variant="outline" className="bg-transparent hover:bg-accent rounded-lg" onClick={toggleOrder}>
          <Icons.arrowDownNarrowWide size={16} className="mr-1" />
          Theo thứ tự ngược lại
        </Button>
      </CardHeader>
      <CardContent>
        <UpdatedChapter data={chapters.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]} slug={slug} />
        <ListContent data={sortedChapters} slug={slug} />
      </CardContent>
    </Card>
  );
}
