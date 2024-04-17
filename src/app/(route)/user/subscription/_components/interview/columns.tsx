"use client";

import { JoinInterviewButton } from "@/app/employer/interview/_components";
import { Badge } from "@/components/ui/badge";
import { UserProfileInterviewType } from "@/types/employee/interview";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserProfileInterviewType>[] = [
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          {record.job.company.companyName}
          {!record.isActivate && (
            <Badge variant={"outline"} className="ml-2 text-red-500">
              Unavailable
            </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          {record.hour}:{record.minute} {record.periodTime}
        </>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    header: "Interview",
    cell: ({ row }) => {
      const record = row.original as UserProfileInterviewType;
      const status = record.status;
      return (
        <>
          {status ? (
            <>Finished</>
          ) : (
            <JoinInterviewButton
              isActive={record.isActivate}
              roomId={record.roomId}
              id={record.id}
            />
          )}
        </>
      );
    },
  },
];
