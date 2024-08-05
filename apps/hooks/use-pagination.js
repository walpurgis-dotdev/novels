import * as React from "react";
import { ELLIPSIS_OFFSET, ITEMS_PER_PAGE_OPTIONS, MAX_DISPLAY_PAGES } from "@/utils/constants";

export const usePagination = (data, initialItemsPerPage = ITEMS_PER_PAGE_OPTIONS[1]) => {
  // State hooks for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(initialItemsPerPage);

  // Derived state for pagination
  const maxPage = Math.ceil(data?.length / itemsPerPage);
  const currentItems = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Event handlers for pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Pagination logic for pagination
  const calculatePagination = () => {
    let pages = [];
    if (maxPage <= MAX_DISPLAY_PAGES) {
      pages = Array.from({ length: maxPage }, (_, i) => i + 1);
    } else {
      const halfDisplay = Math.floor(MAX_DISPLAY_PAGES / 2);
      if (currentPage <= halfDisplay) {
        pages = Array.from({ length: MAX_DISPLAY_PAGES }, (_, i) => i + 1);
      } else if (currentPage > halfDisplay && currentPage <= maxPage - halfDisplay) {
        const startPage = currentPage - halfDisplay;
        pages = Array.from({ length: MAX_DISPLAY_PAGES }, (_, i) => startPage + i);
      } else {
        pages = Array.from({ length: MAX_DISPLAY_PAGES }, (_, i) => maxPage - MAX_DISPLAY_PAGES + i + 1);
      }
    }
    return pages;
  };

  const pages = calculatePagination();
  const shouldRenderEllipsisStart = currentPage > MAX_DISPLAY_PAGES - ELLIPSIS_OFFSET && maxPage > MAX_DISPLAY_PAGES;
  const shouldRenderEllipsisEnd = currentPage < maxPage - ELLIPSIS_OFFSET && maxPage > MAX_DISPLAY_PAGES;

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    maxPage,
    currentItems,
    handlePageChange,
    handleItemsPerPageChange,
    pages,
    shouldRenderEllipsisStart,
    shouldRenderEllipsisEnd,
  };
};
