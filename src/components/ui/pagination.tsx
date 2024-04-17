"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationType {
  currentPage: number;
  totalPage: number;
  isDisableNext: boolean;
  limit: number;
  isDisablePrevious: boolean;
  setCurrentPage: (page: number) => void;
  setTotalPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  calculatePage: (totalItems: number) => void;
}
export const Pagination: React.FC<PaginationType> = ({
  currentPage,
  isDisableNext,
  isDisablePrevious,
  totalPage,
  goToNextPage,
  goToPreviousPage,
  setCurrentPage,
}) => {
  const renderPageNumbers = () => {
    const visiblePages = 5;
    const pageNumbers = [];
    const ellipsis = <MoreHorizontal size={20} />;
    const renderPageNumber = (pageNumber: number) => (
      <Button
        key={pageNumber}
        variant={"ghost"}
        onClick={() => {
          setCurrentPage(pageNumber);
        }}
        className={cn(pageNumber === currentPage && "bg-slate-100 font-bold")}
      >
        {pageNumber}
      </Button>
    );

    if (totalPage <= visiblePages) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(renderPageNumber(i));
      }
    } else {
      if (currentPage <= Math.ceil(visiblePages / 2)) {
        for (let i = 1; i <= visiblePages; i++) {
          pageNumbers.push(renderPageNumber(i));
        }
        pageNumbers.push(ellipsis);
      } else if (currentPage >= totalPage - Math.floor(visiblePages / 2)) {
        pageNumbers.push(ellipsis);
        for (let i = totalPage - visiblePages + 1; i <= totalPage; i++) {
          pageNumbers.push(renderPageNumber(i));
        }
      } else {
        pageNumbers.push(ellipsis);
        for (
          let i = currentPage - Math.floor(visiblePages / 2);
          i <= currentPage + Math.floor(visiblePages / 2);
          i++
        ) {
          pageNumbers.push(renderPageNumber(i));
        }
        pageNumbers.push(ellipsis);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="mt-4 flex w-full items-center justify-center gap-2">
      <Button
        disabled={isDisablePrevious}
        onClick={goToPreviousPage}
        variant={"secondary"}
      >
        <ChevronLeft size={20} className="mr-2" />
        Previous
      </Button>
      {renderPageNumbers()}
      <Button
        disabled={isDisableNext}
        onClick={goToNextPage}
        variant={"secondary"}
      >
        Next <ChevronRight size={20} className="ml-2" />
      </Button>
    </div>
  );
};
