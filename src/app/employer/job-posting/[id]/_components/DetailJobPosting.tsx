"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { format, parseISO } from "date-fns";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { StatisticChart } from ".";
import { StatisticTable } from "./table";

interface Props {
  slug: string;
}

export const DetailJobPosting: React.FC<Props> = ({ slug }) => {
  const { getDetailJobBySlug } = useEmployerApi();
  const { isLoading, data, isError, isIdle } = useQuery({
    queryKey: [EmployerQueryKeys.DETAIL_JOB_POSTING, slug],
    queryFn: () => {
      return getDetailJobBySlug(slug);
    },
    enabled: !!slug,
  });

  const res = useMemo(() => data?.data?.data ?? {}, [data]);

  if (isError) return <p className="font-semibold">Not found</p>;

  if (isLoading || isIdle)
    return (
      <div className="flex w-full justify-center pt-10">
        <ThreeCircles
          visible={true}
          height="50"
          width="50"
          color="#4682a9"
          ariaLabel="three-circles-loading"
        />
      </div>
    );

  return (
    <>
      <div className="flex w-full flex-col items-start justify-center gap-6">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-lg">{res.jobTitle}</CardTitle>
            <CardDescription>{res.summary}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div>
              <span className="mr-2 font-bold">Position:</span>
              <span>{res?.positionName ?? res?.position?.positionName}</span>
            </div>
            <div>
              <span className="mr-2 font-bold">Job posting period:</span>
              <span>
                {format(parseISO(`${res.periodStart}`), "LLL dd, y")}
                <span className="mx-1">-</span>
                {format(parseISO(`${res.periodEnd}`), "LLL dd, y")}
              </span>
            </div>
          </CardContent>
        </Card>
        <StatisticChart jobId={res.id} />
      </div>
      <StatisticTable jobId={res.id} />
    </>
  );
};
