"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { ChevronRight, MoveLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

const pathnameList = [
  { title: "Job Posting", key: "job-posting" },
  { title: "Create", key: "new" },
  { title: "Applicant", key: "applicant" },
  { title: "Interview", key: "interview" },
  { title: "Statistic", key: "statistic" },
  { title: "Setting", key: "setting" },
  { title: "Chats", key: "chats" },
  { title: "Note", key: "note" },
];

export const SubHeader = () => {
  const { isActive } = useCheckAuthorization();
  const router = useRouter();
  const paths = usePathname();
  const pathNames = paths
    .split("/")
    .filter((path) => path)
    .slice(1)
    .filter((i) => !!pathnameList.find((e) => e.key === i));

  const goPreviousPage = () => {
    router.back();
  };

  if (!isActive) return <></>;
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} onClick={goPreviousPage}>
          <MoveLeft size={20} />
        </Button>
        {pathNames.map((i, index) => (
          <Fragment key={i}>
            <span className="font-semibold">
              {pathnameList.find((e) => e.key === i)?.title}
            </span>
            {index !== pathNames.length - 1 && <ChevronRight size={15} />}
          </Fragment>
        ))}
      </div>
      <Separator className="my-2" />
    </div>
  );
};
