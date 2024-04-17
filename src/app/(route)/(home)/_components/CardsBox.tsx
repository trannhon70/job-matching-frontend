"use client";

import { EmployeeQueryKeys } from "@/enums";
import useJobList from "@/hooks/employee/useJobList";
import { getJobsList } from "@/services/apis/job";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useReadLocalStorage } from "usehooks-ts";
import { JobCard, JobsFilterType, SkeletonList } from ".";
import { JobListPagination } from "./JobListPagination";

export const CardsBox = () => {
  const searchParams = useSearchParams();
  const salary = searchParams.get("salary");
  const position = searchParams.get("position");
  const { limit, currentPage, calculatePage } = useJobList();
  const jobsFilter = useReadLocalStorage("jobsFilter") as JobsFilterType;
  const { isLoading, data } = useQuery({
    queryKey: [
      EmployeeQueryKeys.JOB_LIST,
      { limit, currentPage, jobsFilter, salary, position },
    ],
    queryFn: () => {
      return getJobsList({
        limit,
        page: currentPage,
        keyword: jobsFilter?.keyword ?? "",
        country: jobsFilter?.country ?? "",
        salary,
        position,
      });
    },
    onSuccess: (res) => {
      calculatePage(res?.data?.totalItem ?? 1);
    },
  });

  const res = useMemo(() => data?.data?.data ?? [], [data]);
  if (isLoading) return <SkeletonList />;
  if (res.length === 0) return <div className="mt-10">No job available</div>;
  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {res.map((i) => (
          <JobCard key={i.id} data={i} />
        ))}
      </div>
      <JobListPagination />
    </>
  );
};
