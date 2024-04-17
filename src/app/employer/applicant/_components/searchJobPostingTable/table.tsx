"use client";

import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import useSearchJobPostingState from "@/hooks/employer/useSearchJobPostingState";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Filter } from ".";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  closeModal: () => void;
}

export const SearchJobPostingTable: React.FC<Props> = ({ closeModal }) => {
  const { getJobPosting } = useEmployerApi();
  const { currentPage, limit, calculatePage, filter } =
    useSearchJobPostingState();

  const { isLoading, data } = useQuery({
    queryKey: [
      EmployerQueryKeys.JOB_POSTING,
      { currentPage, limit, ...filter },
    ],
    queryFn: () => {
      return getJobPosting({ page: currentPage, limit, ...filter });
    },
    onSuccess: (res) => {
      calculatePage(res?.data?.totalItem ?? 1);
    },
  });
  const formatData = useMemo(() => {
    return (
      data?.data?.data?.map((e: any, index: number) => ({
        ...e,
        no: index + 1,
      })) ?? []
    );
  }, [data]);
  return (
    <div className="mx-auto w-full">
      <Filter />
      <DataTable
        closeModal={closeModal}
        isLoading={isLoading}
        columns={columns}
        data={formatData}
      />
    </div>
  );
};
