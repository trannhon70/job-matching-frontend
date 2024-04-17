"use client";

import { DetailJobCard } from "@/components/cards";
import { Pagination } from "@/components/ui/pagination";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import useFetchListSaveApply from "@/hooks/employee/query/useFetchListSaveApply";
import useJobListCompany from "@/hooks/employee/useJobListCompany";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";

interface Props {
  id: number;
}

export const JobsList: React.FC<Props> = ({ id }) => {
  useFetchListSaveApply();
  const { getJobByCompany } = useEmployeeApi();
  const { limit, currentPage, calculatePage } = useJobListCompany();
  const { isLoading, data } = useQuery({
    queryKey: [
      `${EmployeeQueryKeys.JOB_LIST_COMPANY}_${id}`,
      { limit, currentPage },
    ],
    queryFn: () => {
      return getJobByCompany(id, {
        limit,
        page: currentPage,
      });
    },
    onSuccess: (res) => {
      calculatePage(res?.data?.totalItem ?? 1);
    },
    enabled: !!id,
  });

  const res = useMemo(() => data?.data?.data ?? [], [data]);
  return (
    <div className="overflow-hidden bg-white shadow-md">
      <div className="w-full bg-gradient-to-r from-indigo-900 to-indigo-500 px-6 py-3 text-lg font-semibold text-white">
        Jobs list
      </div>

      <div className="flex w-full flex-col gap-4 p-6">
        {isLoading && (
          <ThreeCircles
            visible={true}
            height="40"
            width="40"
            color="#4682a9"
            ariaLabel="three-circles-loading"
          />
        )}
        {res.map((i) => (
          <DetailJobCard key={i.id} data={i} />
        ))}
      </div>
      <div className="my-6 w-full">
        <TablePagination />
      </div>
    </div>
  );
};

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
  } = useJobListCompany();
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
