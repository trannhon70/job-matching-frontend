"use client";

import { Pagination } from "@/components/ui/pagination";
import useInterviewState from "@/hooks/employer/useInterviewState";

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
  } = useInterviewState();
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
