"use client";

import { Pagination } from "@/components/ui/pagination";
import useJobList from "@/hooks/employee/useJobList";

export const JobListPagination = () => {
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
  } = useJobList();
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
