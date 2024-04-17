"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { globalVariable } from "@/config/variables";
import useApplyJobMutation from "@/hooks/employee/mutation/useApplyJobMutation";
import useSaveJobMutation from "@/hooks/employee/mutation/useSaveJobMutation";
import useFetchListSaveApply from "@/hooks/employee/query/useFetchListSaveApply";
import useListApplySave from "@/hooks/employee/useListApplySave";
import { cn } from "@/lib/utils";
import { JobPostingType } from "@/types/employer/job-posting";
import { format, parseISO } from "date-fns";
import { Forward, Loader2, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useMemo } from "react";
import { FacebookShareButton } from "react-share";

interface Props {
  data: JobPostingType;
}

export const Summary: React.FC<Props> = ({ data }) => {
  const {
    id,
    salary,
    position,
    positionName,
    periodStart,
    periodEnd,
    specificDuties,
    duty,
    insurance,
    benefit,
    skillAbilities,
    startDate,
    vacation,
    hour,
    jobType,
    document,
    officer,
    other,
    accommodation,
    visa,
    dateRecruitment,
    process,
    slug,
    company,
    totalClick,
    currency,
    totalSave,
    apply: countApply,
  } = data;
  useFetchListSaveApply();
  const session = useSession();
  const router = useRouter();
  const saveMutation = useSaveJobMutation();
  const applyMutation = useApplyJobMutation();
  const { applyList, saveList } = useListApplySave();
  const hasApplied = useMemo(
    () => !!applyList.find((i) => i === data.id),
    [applyList, data],
  );

  const hasSaved = useMemo(
    () => !!saveList.find((i) => i === data.id),
    [saveList, data],
  );
  const primaryInformation = useMemo(
    () => [
      { title: "Salary", content: `${salary} (${currency})` },
      { title: "Job Type", content: jobType },
      { title: "Position", content: positionName ?? position?.positionName },
      { title: "Address", content: company.address },
      {
        title: "Period",
        content: `${format(parseISO(`${periodStart}`), "LLL dd, y")} - ${format(
          parseISO(`${periodEnd}`),
          "LLL dd, y",
        )}`,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const detailInformation = useMemo(
    () => [
      { title: "Position", content: positionName ?? position?.positionName },
      { title: "Skills and Abilities", content: skillAbilities },
      { title: "Specific Duties", content: specificDuties },
      { title: "Duty", content: duty },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const workCondition = useMemo(
    () => [
      { title: "Job Type", content: jobType },
      {
        title: "Starting Date",
        content: format(parseISO(`${startDate}`), "LLL dd, y"),
      },
      { title: "Salary", content: `${salary} (${currency})` },
      { title: "Insurance", content: insurance },
      { title: "Hours", content: hour },
      { title: "Accommodation", content: accommodation },
      { title: "Visa", content: visa },
      { title: "Vacation", content: vacation },
      {
        title: "Benefit",
        content: benefit,
        isStretch: true,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  const apply = useMemo(
    () => [
      {
        title: "Period",
        content: `${format(parseISO(`${periodStart}`), "LLL dd, y")} - ${format(
          parseISO(`${periodEnd}`),
          "LLL dd, y",
        )}`,
      },
      {
        title: "Date of recruitment",
        content: format(parseISO(`${dateRecruitment}`), "LLL dd, y"),
      },
      { title: "Documents", content: document },
      { title: "Process", content: process },
      { title: "HR Officer", content: officer },
      { title: "Other", content: other },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const onClickApply = () => {
    if (session.status !== "authenticated") {
      router.push("/login");
      return;
    }
    applyMutation.mutate({
      jobId: +id,
    });
  };

  const onClickSave = () => {
    if (session.status !== "authenticated") {
      router.push("/login");
      return;
    }
    saveMutation.mutate({
      idJob: +id,
      status: 1,
    });
  };

  return (
    <div className="flex w-full flex-col gap-6 lg:w-2/3">
      <div className="w-full bg-white p-6">
        <h1 className="text-xl font-bold">{data.jobTitle}</h1>
        <p className="mt-2">{data.summary}</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {primaryInformation.slice(0, 3).map((i) => (
            <div
              key={i.title}
              className="flex flex-col items-center justify-center border-2 border-indigo-800 bg-indigo-50/20 p-2"
            >
              <span className="text-sm">{i.title}</span>
              <p className="font-semibold">{i.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {primaryInformation.slice(3, 5).map((i) => (
            <div
              key={i.title}
              className="flex flex-col items-center justify-center border-2 border-indigo-800 bg-indigo-50/20 p-2"
            >
              <span className="text-sm">{i.title}</span>
              <p className="font-semibold">{i.content}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {hasApplied || applyMutation.isSuccess ? (
            <Button disabled className="mt-4 flex-1">
              Applied
            </Button>
          ) : (
            <Button
              disabled={applyMutation.isLoading}
              onClick={onClickApply}
              className="mt-4 flex-1"
            >
              {applyMutation.isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Apply now
            </Button>
          )}
          {hasSaved || saveMutation.isSuccess ? (
            <Button disabled className="mt-4" variant={"outline"}>
              Saved
            </Button>
          ) : (
            <Button
              onClick={onClickSave}
              className="mt-4"
              variant={"outline"}
              disabled={saveMutation.isLoading}
            >
              {saveMutation.isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save job
            </Button>
          )}
        </div>
      </div>
      {/* section 2 */}
      <div className="w-full bg-white p-6">
        {/* row 1 */}
        <div className="flex flex-col items-end gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-medium">
            <div>
              Apply <Badge>{countApply.length}</Badge>
            </div>
            <Separator orientation="vertical" />
            <div>
              Save <Badge>{totalSave}</Badge>
            </div>
            <Separator orientation="vertical" />
            <div>
              View <Badge>{totalClick}</Badge>
            </div>
          </div>
          <Separator className="md:hidden" orientation="horizontal" />
          <div>
            <Button
              disabled={saveMutation.isLoading}
              variant={"ghost"}
              onClick={onClickSave}
            >
              <Save />
            </Button>
            <FacebookShareButton url={`${globalVariable.BASE_URL}/job/${slug}`}>
              <Button variant={"ghost"} onClick={() => {}}>
                <Forward />
              </Button>
            </FacebookShareButton>
            {/* <Button variant={"ghost"}>
              <Printer />
            </Button> */}
          </div>
        </div>
        <Separator orientation="horizontal" />
        {/* row 2 */}
        <div className="mt-8 w-full">
          <div className="border-l-8 border-indigo-900 pl-2 text-xl font-bold">
            Job information
          </div>
          <div className="mt-6">
            <div className="font-semibold">Detail information</div>
            <div className="mt-2 grid grid-cols-1 gap-1 gap-x-0 overflow-hidden text-sm md:grid-cols-3 md:gap-x-1">
              {detailInformation.map((i) => (
                <Fragment key={i.title}>
                  <div className="bg-indigo-50 px-4 py-2 font-medium md:text-center">
                    {i.title}
                  </div>
                  <div className="col-span-2 bg-indigo-50 px-4 py-2 ">
                    {i.content}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div className="font-semibold">Work Condition</div>
            <div className="mt-2 grid grid-cols-1 gap-1 gap-x-0 overflow-hidden text-sm md:grid-cols-4 md:gap-x-1">
              {workCondition.map((i) => (
                <Fragment key={i.title}>
                  <div className="flex items-center justify-center bg-indigo-50 px-4 py-2 font-medium md:text-center">
                    {i.title}
                  </div>
                  <div
                    className={cn(
                      "bg-indigo-50 px-4 py-2 ",
                      i.isStretch && "col-span-1 md:col-span-3",
                    )}
                  >
                    {i.content}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div className="font-semibold">Apply</div>
            <div className="mt-2 grid grid-cols-1 gap-1 gap-x-0 overflow-hidden text-sm md:grid-cols-3 md:gap-x-1">
              {apply.map((i) => (
                <Fragment key={i.title}>
                  <div className="bg-indigo-50  px-4 py-2 font-medium md:text-center">
                    {i.title}
                  </div>
                  <div className="col-span-2 bg-indigo-50 px-4 py-2">
                    {i.content}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {hasApplied ? (
              <Button disabled className="uppercase">
                Applied
              </Button>
            ) : (
              <Button
                disabled={applyMutation.isLoading}
                onClick={onClickApply}
                className="uppercase"
              >
                {applyMutation.isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Apply now
              </Button>
            )}
            {hasSaved ? (
              <Button variant={"outline"} className="uppercase">
                Saved
              </Button>
            ) : (
              <Button
                onClick={onClickSave}
                variant={"outline"}
                className="uppercase"
                disabled={saveMutation.isLoading}
              >
                {saveMutation.isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save job
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
