import { Card, CardDescription, CardHeader } from "@/components/primitives/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/primitives/ui/pagination";

import { GoToPage } from "./_comps/go-to-page";
import { ItemsPerPageSelect } from "./_comps/items-per-page-select";
import { PageNavigationButtons } from "./_comps/page-navigation-buttons";

export function PaginationControls({
  currentPage,
  maxPage,
  pages,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  onJump,
  shouldRenderEllipsisStart,
  shouldRenderEllipsisEnd,
  itemsPerPage,
  onItemsPerPageChange,
}) {
  return (
    <Card className="border-none shadow-none bg-transparent mt-6">
      <CardHeader>
        <Pagination className="space-x-4">
          {/* Items per page */}
          <PaginationContent className="flex-1 justify-end">
            <ItemsPerPageSelect itemsPerPage={itemsPerPage} onItemsPerPageChange={onItemsPerPageChange} />
          </PaginationContent>
          {/* Page navigation */}
          <PageNavigationButtons onFirst={onFirst} onPrevious={onPrevious} onNext={onNext} onLast={onLast}>
            <PaginationContent className="space-x-2">
              {shouldRenderEllipsisStart && <PaginationEllipsis />}
              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink isActive={currentPage === page} onClick={() => onJump(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {shouldRenderEllipsisEnd && <PaginationEllipsis />}
            </PaginationContent>
          </PageNavigationButtons>
          {/* Go to page */}
          <PaginationContent className="flex-1 justify-start">
            <GoToPage currentPage={currentPage} onJump={onJump} maxPage={maxPage} />
          </PaginationContent>
        </Pagination>
      </CardHeader>
    </Card>
  );
}
