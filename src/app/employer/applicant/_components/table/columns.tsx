"use client";

import { InterviewRegisterModal } from "@/app/employer/interview/_components";
import { Button } from "@/components/ui/button";
import { ApplicantStatus } from "@/enums/employer";
import { ApplicantResType } from "@/types/employer/applicant";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { CreateChatButton } from "..";

export const columns: ColumnDef<ApplicantResType>[] = [
  {
    accessorKey: "no",
    header: "No.",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const record = row.original;
      return <>{format(parseISO(`${record.date}`), "LLL dd, y")}</>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <Button variant={"ghost"} asChild>
          <a href={`/profile/${record.user.id}`} target="_blank">
            {record.user.firstName} {record.user.lastName}
          </a>
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const record = row.original;
      return <>{record.user.phone}</>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const record = row.original;
      return <>{record.job.jobTitle}</>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const record = row.original;
      return <>{ApplicantStatus[+record.status as number]}</>;
    },
  },
  {
    header: "Chat",
    cell: ({ row }) => {
      const record = row.original;
      return <CreateChatButton applicantId={record.id} />;
    },
  },
  {
    header: "Interview",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <InterviewRegisterModal jobId={record.job.id} userId={record.user.id} />
      );
    },
  },
  {
    header: "Note",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <Button>
          <Link href={`/employer/applicant/${record.id}/note`}>Write</Link>
        </Button>
      );
    },
  },
];

export const columnsNotMaster = columns.filter(
  (i) => i.header !== "Interview" && i.header !== "Note",
);
