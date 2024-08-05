"use client";

import { PaginationControls } from "@/components/navigation/pagination/pagination-controls";
import { Card } from "@/components/primitives/ui/card";
import { usePagination } from "@/hooks/use-pagination";

import { RankingListItem } from "../_comps/ranking-list-item";

export function RatingBoard({ data, type }) {
  const {
    currentPage,
    maxPage,
    pages,
    handlePageChange,
    handleItemsPerPageChange,
    currentItems,
    shouldRenderEllipsisStart,
    shouldRenderEllipsisEnd,
    itemsPerPage,
  } = usePagination(data);

  return (
    <Card
      className="cursor-pointer border-none shadow-none shrink-0 dark:ring-1 dark:ring-border w-full pt-32"
      style={{
        backgroundImage: `url('/assets/ranks/i1896x310/${type}.png')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <section className="space-y-8">
        {currentItems.map((item, idx) => {
          const num = (currentPage - 1) * itemsPerPage + idx + 1;
          return <RankingListItem key={item.id} item={item} num={num} />;
        })}
      </section>
      <PaginationControls
        currentPage={currentPage}
        maxPage={maxPage}
        pages={pages}
        onPrevious={() => handlePageChange(currentPage - 1)}
        onNext={() => handlePageChange(currentPage + 1)}
        onFirst={() => handlePageChange(1)}
        onLast={() => handlePageChange(maxPage)}
        onJump={handlePageChange}
        shouldRenderEllipsisStart={shouldRenderEllipsisStart}
        shouldRenderEllipsisEnd={shouldRenderEllipsisEnd}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </Card>
  );
}
