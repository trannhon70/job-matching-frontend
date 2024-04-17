"use client";

import { getDetailJobBySlug } from "@/services/apis/job";
import { JobPostingType } from "@/types/employer/job-posting";
import { useQuery } from "react-query";
import { CompanyInfo, Summary } from ".";

interface Props {
  slug: string;
}

export const FetchingJob: React.FC<Props> = ({ slug }) => {
  const { isLoading, data } = useQuery({
    queryKey: [`detail-job-${slug}`],
    queryFn: () => getDetailJobBySlug(slug),
  });
  const res = data?.data?.data as JobPostingType;
  if (isLoading) return <>Loading...</>;
  if (!res) return <>Not found</>;
  return (
    <div className="flex flex-col-reverse gap-6 lg:flex-row">
      <Summary data={res} />
      <CompanyInfo data={res} />
    </div>
  );
};
