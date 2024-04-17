"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useApplyJobMutation from "@/hooks/employee/mutation/useApplyJobMutation";
import useSaveJobMutation from "@/hooks/employee/mutation/useSaveJobMutation";
import { cn } from "@/lib/utils";
import { JobType } from "@/types/employee/job";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useMemo } from "react";

import avatar from "@/assets/images/default-avatar-company.png";
import useListApplySave from "@/hooks/employee/useListApplySave";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: JobType;
}

export const DetailJobCard: React.FC<Props> = ({ data }) => {
  const { applyList, saveList } = useListApplySave();
  const applyMutation = useApplyJobMutation();
  const saveMutation = useSaveJobMutation();
  const session = useSession();
  const router = useRouter();

  const hasApplied = useMemo(
    () => !!applyList.find((i) => i === data.id),
    [applyList, data],
  );

  const hasSaved = useMemo(
    () => !!saveList.find((i) => i === data.id),
    [saveList, data],
  );
  const cardTemplate = useMemo(
    () => [
      {
        title: "Summary",
        content: data.summary,
        isStretch: true,
      },
      { title: "Salary", content: `${data.salary} ${data.currency}` },
      { title: "Job Type", content: data?.jobType },
      {
        title: "Position",
        content: data.positionName ?? data?.position?.positionName,
      },
      {
        title: "Period",
        content: `${format(
          parseISO(`${data.periodStart}`),
          "LLL dd, y",
        )} - ${format(parseISO(`${data.periodEnd}`), "LLL dd, y")}`,
      },
      {
        title: "Start Date",
        content: format(parseISO(`${data.startDate}`), "LLL dd, y"),
        isStretch: true,
      },
    ],
    [data],
  );

  const onClickApply = () => {
    if (session.status !== "authenticated") {
      router.push("/login");
      return;
    }
    applyMutation.mutate({
      jobId: +data.id,
    });
  };

  const onClickSave = () => {
    if (session.status !== "authenticated") {
      router.push("/login");
      return;
    }
    saveMutation.mutate({
      idJob: +data.id,
      status: 1,
    });
  };

  return (
    <Card className="relative w-full p-6">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-10">
        <div className="flex flex-1 items-center gap-6">
          <Avatar className="md:h-12 md:w-12">
            <Image
              src={data.company.fileLogo ?? avatar}
              alt="ava"
              fill
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {data.isActivate ? (
            <Link href={`/job/${data.slug}`} className="font-bold">
              {data.jobTitle}
            </Link>
          ) : (
            <h3 className="font-bold">{data.jobTitle}</h3>
          )}
          {!data.isActivate && <Badge variant={"destructive"}>Suspended</Badge>}
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <div>
            Apply <Badge>{data?.apply?.length}</Badge>
          </div>
          <Separator orientation="vertical" />
          <div>
            Save <Badge>{data.totalSave}</Badge>
          </div>
          <Separator orientation="vertical" />
          <div>
            View <Badge>{data.totalClick}</Badge>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-1 overflow-hidden text-sm md:grid-cols-4">
        {cardTemplate.map((i) => (
          <Fragment key={i.title}>
            <div className="bg-indigo-50 px-4 py-2 font-medium md:text-center">
              {i.title}
            </div>
            <div
              className={cn(
                "bg-indigo-50 px-4 py-2",
                i.isStretch && "md:col-span-3",
              )}
            >
              {i.content}
            </div>
          </Fragment>
        ))}
      </div>
      <div className="mt-4 flex w-full justify-end gap-2">
        {hasApplied || applyMutation.isSuccess || !data.isActivate ? (
          <Button disabled variant={"ghost"}>
            Applied
          </Button>
        ) : (
          <Button onClick={onClickApply} disabled={applyMutation.isLoading}>
            {applyMutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Apply
          </Button>
        )}

        {hasSaved || saveMutation.isSuccess || !data.isActivate ? (
          <Button disabled variant={"ghost"}>
            Saved
          </Button>
        ) : (
          <Button
            onClick={onClickSave}
            disabled={saveMutation.isLoading}
            variant={"outline"}
          >
            {saveMutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        )}
      </div>
    </Card>
  );
};
