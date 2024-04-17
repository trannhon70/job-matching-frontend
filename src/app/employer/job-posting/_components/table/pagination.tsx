"use client";

import { Pagination } from "@/components/ui/pagination";
import { useJobPostingState } from "@/hooks/employer/useJobPostingState";

export const TablePagination = () => {
  const {
    currentPage,
    totalPage,
    isDisablePrevious,
    isDisableNext,
    limit,
    setCurrentPage,
    goToPreviousPage,
    goToNextPage,
    setTotalPage,
    calculatePage,
  } = useJobPostingState();
  return (
    <Pagination
      limit={limit}
      calculatePage={calculatePage}
      setTotalPage={setTotalPage}
      isDisableNext={isDisableNext}
      isDisablePrevious={isDisablePrevious}
      currentPage={currentPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      setCurrentPage={setCurrentPage}
      totalPage={totalPage}
    />
  );
};
